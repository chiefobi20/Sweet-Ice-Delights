from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User
from config import db

class Register(Resource):
    def post(self):
        data = request.get_json()

        if User.query.filter_by(username=data.get('username')).first():
            return {'message': 'Username already exists'}, 400

        if User.query.filter_by(email=data.get('email')).first():
            return {'message': 'Email already exists'}, 400

        user = User(
            username=data.get('username'),
            email=data.get('email')
        )
        user.password = data.get('password')

        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user.id)
        return {
            'access_token': access_token,
            'user': user.to_dict()
        }, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()

        if user and user.check_password(data.get('password')):
            access_token = create_access_token(identity=user.id)
            return {
                'access_token': access_token,
                'user': user.to_dict()
            }, 200

        return {'message': 'Invalid credentials'}, 401

class Profile(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        return user.to_dict(), 200

class RefreshToken(Resource):
    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        new_token = create_access_token(identity=current_user_id)
        return {'access_token': new_token}, 200
