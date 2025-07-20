#!/usr/bin/env python3

import os
import sys
from flask import Flask
from flask_migrate import init, migrate, upgrade
from config import app, db

def setup_database():
    """Initialize and set up the database"""
    with app.app_context():
        try:
            # Check if migrations folder exists
            if not os.path.exists('migrations'):
                print("Initializing database migrations...")
                init()
            
            # Create migration
            print("Creating migration...")
            migrate(message="Initial migration with authentication")
            
            # Apply migration
            print("Applying migrations...")
            upgrade()
            
            print("Database setup completed successfully!")
            
        except Exception as e:
            print(f"Error setting up database: {e}")
            return False
    
    return True

if __name__ == '__main__':
    setup_database()