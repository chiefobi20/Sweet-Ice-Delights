#!/usr/bin/env python3

from config import app, db
from models import User, Flavor, Order

def check_database():
    """Check what's in the database"""
    with app.app_context():
        print("=== DATABASE CONTENTS ===")
        
        users = User.query.all()
        print(f"\n👥 Users ({len(users)}):")
        for user in users:
            print(f"  - {user.username} ({user.email})")
        
        flavors = Flavor.query.all()
        print(f"\n🍧 Flavors ({len(flavors)}):")
        for flavor in flavors:
            print(f"  - {flavor.name}: ${flavor.price_cents/100:.2f}")
        
        orders = Order.query.all()
        print(f"\n📋 Orders ({len(orders)}):")
        for order in orders:
            print(f"  - Order #{order.id}: ${order.total_cents/100:.2f} ({order.status})")

if __name__ == '__main__':
    check_database()