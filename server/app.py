#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Product, Order  # Import your models

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/api/products')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/users')
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

if __name__ == '__main__':
    app.run(port=5000, debug=True)
