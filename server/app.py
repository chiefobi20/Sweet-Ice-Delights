#!/usr/bin/env python3

from flask import request, jsonify
from flask_restful import Resource
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

# Local imports
from config import app, db, api

# Import models after config to avoid circular imports
from models import Flavor, ContactMessage

# Ensure database tables exist
with app.app_context():
    try:
        # Check if models are imported correctly
        print("🔍 Checking models...")
        print(f"Flavor model: {Flavor}")
        print(f"ContactMessage model: {ContactMessage}")

        db.create_all()
        print("✅ Database tables created/verified")

        # Test database connection
        flavor_count = Flavor.query.count()
        print(f"📊 Current flavors in database: {flavor_count}")

    except Exception as e:
        print(f"❌ Database error: {e}")
        import traceback
        traceback.print_exc()

@app.route('/api/test')
def test():
    return jsonify({'message': 'Server is running!', 'status': 'OK'})

@app.route('/api/health')
def health():
    """Health check endpoint"""
    try:
        flavor_count = Flavor.query.count()
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'flavors_count': flavor_count
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

class Flavors(Resource):
    def get(self):
        try:
            print("🔍 Flavors API called")

            # Check if any flavors exist
            all_flavors = Flavor.query.all()
            print(f"📊 Total flavors in database: {len(all_flavors)}")

            if len(all_flavors) == 0:
                print("⚠️  No flavors found, creating sample data...")
                self.create_sample_flavors()

            # Use is_active instead of available
            flavors = Flavor.query.filter_by(is_active=True).all()
            print(f"📊 Found {len(flavors)} active flavors")

            result = []
            for flavor in flavors:
                try:
                    flavor_dict = flavor.to_dict()
                    result.append(flavor_dict)
                    print(f"  ✅ Added flavor: {flavor.name}")
                except Exception as e:
                    print(f"❌ Error converting flavor {flavor.id}: {e}")
                    continue

            print(f"✅ Returning {len(result)} flavors")
            return result

        except Exception as e:
            print(f"❌ Flavors API Error: {str(e)}")
            import traceback
            traceback.print_exc()
            return {'error': 'Failed to fetch flavors', 'details': str(e)}, 500

    def create_sample_flavors(self):
        """Create sample flavors if none exist"""
        try:
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
            print("✅ Sample flavors created!")

        except Exception as e:
            print(f"❌ Error creating sample flavors: {e}")
            db.session.rollback()

class Contact(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {'error': 'No data provided'}, 400

            # Save to database
            contact_message = ContactMessage(
                name=data.get('name'),
                email=data.get('email'),
                phone=data.get('phone'),
                event_type=data.get('eventType'),
                message=data.get('message'),
                selected_dates=','.join(data.get('selectedDates', []))
            )

            db.session.add(contact_message)
            db.session.commit()

            # Send email notification
            self.send_email_notification(data)

            return {'message': 'Contact form submitted successfully'}

        except Exception as e:
            print(f"❌ Contact form error: {str(e)}")
            db.session.rollback()
            return {'error': 'Failed to process contact form'}, 500

    def send_email_notification(self, data):
        """Send email notification for contact form submission"""
        try:
            print(f"🔍 Email Config Check:")
            print(f"  SMTP_SERVER: {app.config.get('SMTP_SERVER')}")
            print(f"  SMTP_PORT: {app.config.get('SMTP_PORT')}")
            print(f"  SENDER_EMAIL: {app.config.get('SENDER_EMAIL')}")
            print(f"  RECIPIENT_EMAIL: {app.config.get('RECIPIENT_EMAIL')}")

            msg = MIMEMultipart()
            msg['From'] = app.config['SENDER_EMAIL']
            msg['To'] = app.config['RECIPIENT_EMAIL']
            msg['Subject'] = f"New Contact Form Submission - {data.get('name')}"

            body = f"""
New contact form submission:

Name: {data.get('name')}
Email: {data.get('email')}
Phone: {data.get('phone', 'Not provided')}
Event Type: {data.get('eventType', 'Not specified')}
Selected Dates: {', '.join(data.get('selectedDates', []))}

Message:
{data.get('message')}
            """

            msg.attach(MIMEText(body, 'plain'))

            print("📧 Connecting to SMTP server...")
            server = smtplib.SMTP(app.config['SMTP_SERVER'], app.config['SMTP_PORT'])

            print("🔐 Starting TLS...")
            server.starttls()

            print("🔑 Logging in...")
            server.login(app.config['SENDER_EMAIL'], app.config['SENDER_PASSWORD'])

            print("📤 Sending message...")
            server.send_message(msg)
            server.quit()

            print("✅ Email sent successfully")

        except Exception as e:
            print(f"❌ Email sending failed: {e}")
            print(f"❌ Error type: {type(e).__name__}")
            import traceback
            traceback.print_exc()

# Add resources to API
api.add_resource(Flavors, '/api/flavors')
api.add_resource(Contact, '/api/contact')

@app.route('/api/debug')
def debug():
    """Debug endpoint to check everything"""
    try:
        with app.app_context():
            # Check database
            all_flavors = Flavor.query.all()
            active_flavors = Flavor.query.filter_by(is_active=True).all()

            debug_info = {
                'database_connected': True,
                'total_flavors': len(all_flavors),
                'active_flavors': len(active_flavors),
                'flavors_list': [
                    {
                        'id': f.id,
                        'name': f.name,
                        'price_cents': f.price_cents,
                        'is_active': f.is_active
                    } for f in all_flavors
                ],
                'server_status': 'running',
                'endpoints': ['/api/test', '/api/health', '/api/flavors', '/api/contact', '/api/debug']
            }

            return jsonify(debug_info)

    except Exception as e:
        return jsonify({
            'error': str(e),
            'database_connected': False
        }), 500

@app.route('/api/test-email')
def test_email():
    """Test email configuration"""
    try:
        server = smtplib.SMTP(app.config['SMTP_SERVER'], app.config['SMTP_PORT'])
        server.starttls()
        server.login(app.config['SENDER_EMAIL'], app.config['SENDER_PASSWORD'])
        server.quit()
        return jsonify({'status': 'Email config working!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/debug-config')
def debug_config():
    """Debug configuration values"""
    return jsonify({
        'SMTP_SERVER': app.config.get('SMTP_SERVER'),
        'SMTP_PORT': app.config.get('SMTP_PORT'),
        'SENDER_EMAIL': app.config.get('SENDER_EMAIL'),
        'RECIPIENT_EMAIL': app.config.get('RECIPIENT_EMAIL'),
        'has_password': bool(app.config.get('SENDER_PASSWORD'))
    })

if __name__ == '__main__':
    print("🚀 Starting Flask server on http://localhost:5000")
    print("📊 Available endpoints:")
    print("  - GET  /api/test")
    print("  - GET  /api/health")
    print("  - GET  /api/flavors")
    print("  - POST /api/contact")
    app.run(port=5000, debug=True, host='0.0.0.0')
