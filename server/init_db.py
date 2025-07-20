#!/usr/bin/env python3

import os
from config import app, db
from models import User, Flavor, Order, OrderItem

def init_database():
    """Initialize the database and create all tables"""
    with app.app_context():
        try:
            # Remove existing database file if it exists (for fresh start)
            db_path = 'instance/app.db'
            if os.path.exists(db_path):
                print(f"Removing existing database: {db_path}")
                os.remove(db_path)
            
            # Create instance directory if it doesn't exist
            os.makedirs('instance', exist_ok=True)
            
            # Create all tables
            print("Creating database tables...")
            db.create_all()
            
            print("Database initialized successfully!")
            print(f"Database created at: {os.path.abspath(db_path)}")
            
            return True
            
        except Exception as e:
            print(f"Error initializing database: {e}")
            return False

if __name__ == '__main__':
    if init_database():
        print("\nYou can now:")
        print("1. Run: python seed.py (to add sample data)")
        print("2. Run: python app.py (to start the server)")
    else:
        print("Database initialization failed!")