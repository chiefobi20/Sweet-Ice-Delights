#!/usr/bin/env python3

from config import app, db
from models import Flavor

def debug_flavors():
    """Debug flavors API issues"""
    with app.app_context():
        print("=== DEBUGGING FLAVORS API ===")
        
        # Check if tables exist
        try:
            db.create_all()
            print("✅ Database tables created/verified")
        except Exception as e:
            print(f"❌ Database error: {e}")
            return
        
        # Check if Flavor table has data
        try:
            all_flavors = Flavor.query.all()
            print(f"📊 Total flavors in database: {len(all_flavors)}")
            
            available_flavors = Flavor.query.filter_by(available=True).all()
            print(f"✅ Available flavors: {len(available_flavors)}")
            
            if not all_flavors:
                print("⚠️  No flavors found! Creating sample data...")
                create_sample_flavors()
            else:
                for flavor in available_flavors:
                    print(f"  - {flavor.name}: ${flavor.price_cents/100:.2f}")
                    
        except Exception as e:
            print(f"❌ Query error: {e}")
            print("This might be a column name issue")

def create_sample_flavors():
    """Create sample flavors if none exist"""
    try:
        flavors = [
            Flavor(name='Cherry', description='Sweet cherry Italian ice', price_cents=350, available=True),
            Flavor(name='Blue Raspberry', description='Tangy blue raspberry flavor', price_cents=350, available=True),
            Flavor(name='Lemon', description='Refreshing lemon Italian ice', price_cents=300, available=True),
        ]
        
        db.session.add_all(flavors)
        db.session.commit()
        print("✅ Sample flavors created!")
        
    except Exception as e:
        print(f"❌ Error creating flavors: {e}")
        db.session.rollback()

if __name__ == '__main__':
    debug_flavors()