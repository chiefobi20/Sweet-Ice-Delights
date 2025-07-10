from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.string)

# Add User relationship
    orders = db.relationship("Order", back_populates="user", cascade="all")
    carts = db.relationship("Cart", back_populates="cart", cascade="all")

# Add serialization rules
serialize_rules = ('-orders.user',)


# Add validations


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.Timestamp)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

# Add Order relationship


# Add serialization rules


# Add validations


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

# Add OrderItem relationship


# Add serialization rules


# Add validations

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer)
    description = db.Column(db.String)
    price = db.Column(db.Numeric)
    image_url = db.Column(db.String)
    available = db.Column(db.Boolean)
    size = db.Column(db.String)

# Add Product relationship


# Add serialization rules


# Add vaildations


class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.Timestamp)
    is_active = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

# Add Cart relationship


# Add serialization rules


# Add validations

class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

# Add CartItem relationship


# Add serialization rules


# Add validations

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.Timestamp)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

# Add Review relationship


# Add serialization rules


# Add validations