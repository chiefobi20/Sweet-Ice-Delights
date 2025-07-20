#!/usr/bin/env python3

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import app, db
from models import User, Flavor, Order, OrderItem

def seed_data():
    with app.app_context():
        try:
            # Create all tables
            print("Creating tables...")
            db.create_all()

            # Clear existing data (optional)
            print("Clearing existing data...")
            db.session.query(OrderItem).delete()
            db.session.query(Order).delete()
            db.session.query(Flavor).delete()
            db.session.query(User).delete()
            db.session.commit()

            # Create test users
            print("Creating users...")
            user1 = User(username='testuser', email='test@example.com')
            user1.password = 'password123'

            user2 = User(username='admin', email='admin@example.com')
            user2.password = 'admin123'

            db.session.add_all([user1, user2])

            # Create flavors
            print("Creating flavors...")
            flavors = [
                Flavor(name='Cherry', description='Sweet cherry Italian ice', price_cents=350, available=True),
                Flavor(name='Blue Raspberry', description='Tangy blue raspberry flavor', price_cents=350, available=True),
                Flavor(name='Lemon', description='Refreshing lemon Italian ice', price_cents=300, available=True),
                Flavor(name='Orange', description='Citrus orange delight', price_cents=300, available=True),
                Flavor(name='Grape', description='Purple grape Italian ice', price_cents=325, available=True),
                Flavor(name='Strawberry', description='Fresh strawberry flavor', price_cents=375, available=True),
            ]

            db.session.add_all(flavors)
            db.session.commit()

            print("Database seeded successfully!")

        except Exception as e:
            print(f"Error seeding database: {e}")
            db.session.rollback()

if __name__ == '__main__':
    seed_data()
