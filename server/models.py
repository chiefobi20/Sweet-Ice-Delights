from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email    = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    orders   = db.relationship('Order', backref='user', lazy=True)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    items      = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'
    id        = db.Column(db.Integer, primary_key=True)
    order_id  = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    flavor_id = db.Column(db.Integer, db.ForeignKey('flavors.id'), nullable=False)
    quantity  = db.Column(db.Integer, default=1)

class Flavor(db.Model, SerializerMixin):
    __tablename__ = 'flavors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price_cents = db.Column(db.Integer, nullable=False)
    # Use is_active to match migration
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Add property for backward compatibility
    @property
    def available(self):
        return self.is_active

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price_cents': self.price_cents,
            'available': self.is_active  # Use is_active but return as available
        }

class ContactMessage(db.Model, SerializerMixin):
    __tablename__ = 'contact_messages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    event_type = db.Column(db.String(50))
    message = db.Column(db.Text, nullable=False)
    selected_dates = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'event_type': self.event_type,
            'message': self.message,
            'selected_dates': self.selected_dates.split(',') if self.selected_dates else [],
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
