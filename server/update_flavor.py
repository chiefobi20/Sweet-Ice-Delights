#!/usr/bin/env python3

from config import app, db
from models import Flavor

def update_flavor_availability(flavor_name, is_available):
    """Update a flavor's availability status"""
    with app.app_context():
        try:
            flavor = Flavor.query.filter_by(name=flavor_name).first()
            if flavor:
                flavor.is_active = is_available
                db.session.commit()
                status = "Available" if is_available else "Sold Out"
                print(f"✅ Updated {flavor_name} to: {status}")
            else:
                print(f"❌ Flavor '{flavor_name}' not found")
        except Exception as e:
            print(f"❌ Error: {e}")
            db.session.rollback()

if __name__ == '__main__':
    # Example: Make Cherry unavailable
    # update_flavor_availability("Cherry", False)

    # Example: Make Lemon available again
    update_flavor_availability("Orange", True)