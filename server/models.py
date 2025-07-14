from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy

from server.config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    orders = db.relationship("Order", back_populates="user", cascade="all, delete-orphan")
    carts = db.relationship("Cart", back_populates="user", cascade="all, delete-orphan")

    serialize_rules = ("-orders.user", "-carts.user",)

    @validates("username")
    def validate_username(self, key, value):
        if not value or len(value.strip()) == 0:
            raise ValueError("Username must be a non-empty string")
        return value

    @validates("email")
    def validate_email(self, key, value):
        if not value or "@" not in value:
            raise ValueError("Invalid email address")
        return value

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"


class Flavor(db.Model, SerializerMixin):
    __tablename__ = "flavors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.Text)
    price_cents = db.Column(db.Integer, nullable=False, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    order_items = db.relationship("OrderItem", back_populates="flavor", cascade="all, delete-orphan")
    cart_items = db.relationship("CartItem", back_populates="flavor", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="flavor", cascade="all, delete-orphan")

    serialize_rules = ("-order_items.flavor", "-cart_items.flavor", "-reviews.flavor",)

    @validates("name")
    def validate_name(self, key, value):
        if not value or len(value.strip()) == 0:
            raise ValueError("Flavor name must be a non-empty string")
        return value

    def __repr__(self):
        return f"<Flavor {self.name}>"


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default="pending")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    user = db.relationship("User", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    serialize_rules = ("-order_items.order", "-user.orders",)


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    flavor_id = db.Column(db.Integer, db.ForeignKey("flavors.id"), nullable=False)

    order = db.relationship("Order", back_populates="order_items")
    flavor = db.relationship("Flavor", back_populates="order_items")

    serialize_rules = ("-order.order_items", "-flavor.order_items",)

    @validates("quantity")
    def validate_quantity(self, key, value):
        if value < 1:
            raise ValueError("Quantity must be at least 1")
        return value

    @validates("unit_price")
    def validate_unit_price(self, key, value):
        if value < 0:
            raise ValueError("Unit price must be non-negative")
        return value

    def __repr__(self):
        return f"<OrderItem {self.id}: Order {self.order_id}, Flavor {self.flavor_id}, Qty {self.quantity}>"


class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="carts")
    cart_items = db.relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")

    serialize_rules = ("-cart_items.cart", "-user.carts",)

    def __repr__(self):
        return f"<Cart {self.id} for User {self.user_id}>"


class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"), nullable=False)
    flavor_id = db.Column(db.Integer, db.ForeignKey("flavors.id"), nullable=False)

    cart = db.relationship("Cart", back_populates="cart_items")
    flavor = db.relationship("Flavor", back_populates="cart_items")

    serialize_rules = ("-cart.cart_items", "-flavor.cart_items",)

    @validates("quantity")
    def validate_quantity(self, key, value):
        if value < 1:
            raise ValueError("Quantity must be at least 1")
        return value

    def __repr__(self):
        return f"<CartItem {self.id}: Cart {self.cart_id}, Flavor {self.flavor_id}, Qty {self.quantity}>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    flavor_id = db.Column(db.Integer, db.ForeignKey("flavors.id"), nullable=False)

    flavor = db.relationship("Flavor", back_populates="reviews")

    serialize_rules = ("-flavor.reviews",)

    @validates("rating")
    def validate_rating(self, key, value):
        if not (1 <= value <= 5):
            raise ValueError("Rating must be between 1 and 5")
        return value

    def __repr__(self):
        return f"<Review {self.id} for Flavor {self.flavor_id}: {self.rating}>"
