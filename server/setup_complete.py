#!/usr/bin/env python3

import os
import sys
from config import app, db
from models import User, Flavor, Order, OrderItem

def setup_complete():
    """Complete setup: initialize database and add sample data"""
    with app.app_context():
        try:
            # Create instance directory
            os.makedirs('instance', exist_ok=True)

            # Create all tables
            print("Creating database tables...")
            db.create_all()

            # Check if data already exists
            if User.query.first():
                print("Database already has data. Skipping seed.")
                return True

            # Create test users
            print("Creating test users...")
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

            print("✅ Database setup completed successfully!")
            print(f"📁 Database location: {os.path.abspath('instance/app.db')}")
            print("\n🧪 Test accounts created:")
            print("   Username: testuser, Password: password123")
            print("   Username: admin, Password: admin123")
            print("\n🚀 You can now run: python app.py")

            return True

        except Exception as e:
            print(f"❌ Error during setup: {e}")
            db.session.rollback()
            return False

if __name__ == '__main__':
    setup_complete()
