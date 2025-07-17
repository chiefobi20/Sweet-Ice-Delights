#!/usr/bin/env python3

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local imports
from config import app, db, api
from models import User, Flavor, Order, OrderItem
from auth import Register, Login, Profile, RefreshToken

# Ensure database tables exist
with app.app_context():
    db.create_all()

@app.route('/api/test')
def test():
    return {'message': 'Server is running!'}, 200

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

class Flavors(Resource):
    def get(self):
        try:
            flavors = Flavor.query.filter_by(available=True).all()
            return [flavor.to_dict() for flavor in flavors], 200
        except Exception as e:
            return {'error': str(e)}, 500

class Orders(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        orders = Order.query.filter_by(user_id=current_user_id).all()
        return [order.to_dict() for order in orders], 200

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        # Create order
        order = Order(
            user_id=current_user_id,
            total_cents=data.get('total_cents'),
            status='pending'
        )
        db.session.add(order)
        db.session.flush()  # Get order ID

        # Add order items
        for item_data in data.get('items', []):
            order_item = OrderItem(
                order_id=order.id,
                flavor_id=item_data['flavor_id'],
                quantity=item_data['quantity'],
                price_cents=item_data['price_cents']
            )
            db.session.add(order_item)

        db.session.commit()
        return order.to_dict(), 201

class OrderDetail(Resource):
    @jwt_required()
    def get(self, order_id):
        current_user_id = get_jwt_identity()
        order = Order.query.filter_by(id=order_id, user_id=current_user_id).first()

        if not order:
            return {'message': 'Order not found'}, 404

        return order.to_dict(), 200

    @jwt_required()
    def delete(self, order_id):
        current_user_id = get_jwt_identity()
        order = Order.query.filter_by(id=order_id, user_id=current_user_id).first()

        if not order:
            return {'message': 'Order not found'}, 404

        if order.status != 'pending':
            return {'message': 'Can only cancel pending orders'}, 400

        # Update status instead of deleting
        order.status = 'cancelled'
        db.session.commit()

        return {'message': 'Order cancelled successfully'}, 200

# Add resources to API
api.add_resource(Users, '/api/users')
api.add_resource(Flavors, '/api/flavors')
api.add_resource(Orders, '/api/orders')
api.add_resource(OrderDetail, '/api/orders/<int:order_id>')

# Auth routes
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Profile, '/api/profile')
api.add_resource(RefreshToken, '/api/refresh')

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(port=5000, debug=True, host='0.0.0.0')
