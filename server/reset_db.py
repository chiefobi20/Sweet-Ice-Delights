#!/usr/bin/env python3

import os
from config import app, db
from models import Flavor, ContactMessage

def reset_database():
    """Reset database completely"""
    with app.app_context():
        try:
            # Remove existing database file
            db_path = 'instance/app.db'
            if os.path.exists(db_path):
                os.remove(db_path)
                print("🗑️  Removed old database")
            
            # Create instance directory
            os.makedirs('instance', exist_ok=True)
            
            # Create all tables fresh
            db.create_all()
            print("✅ Created fresh database tables")
            
            # Add sample data
            sample_flavors = [
                Flavor(name='Cherry', description='Sweet cherry Italian ice', price_cents=350, is_active=True),
                Flavor(name='Blue Raspberry', description='Tangy blue raspberry flavor', price_cents=350, is_active=True),
                Flavor(name='Lemon', description='Refreshing lemon Italian ice', price_cents=300, is_active=True),
                Flavor(name='Orange', description='Zesty orange Italian ice', price_cents=300, is_active=True),
                Flavor(name='Grape', description='Rich grape flavor', price_cents=325, is_active=True),
                Flavor(name='Strawberry', description='Sweet strawberry delight', price_cents=375, is_active=True),
            ]
            
            for flavor in sample_flavors:
                db.session.add(flavor)
            
            db.session.commit()
            print(f"✅ Added {len(sample_flavors)} sample flavors")
            
            # Verify data
            flavors = Flavor.query.all()
            print(f"📊 Verification: {len(flavors)} flavors in database")
            for flavor in flavors:
                print(f"  - {flavor.name}: ${flavor.price_cents/100:.2f} ({'Active' if flavor.is_active else 'Inactive'})")
            
            return True
            
        except Exception as e:
            print(f"❌ Error resetting database: {e}")
            import traceback
            traceback.print_exc()
            return False

if __name__ == '__main__':
    reset_database()