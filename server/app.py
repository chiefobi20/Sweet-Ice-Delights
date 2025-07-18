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
from models import User, Flavor, ContactMessage
from auth import Register, Login, Profile, RefreshToken

# Ensure database tables exist
with app.app_context():
    db.create_all()

@app.route('/api/test')
def test():
    return {'message': 'Server is running!'}, 200

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

class Flavors(Resource):
    def get(self):
        try:
            flavors = Flavor.query.filter_by(available=True).all()
            return [flavor.to_dict() for flavor in flavors], 200
        except Exception as e:
            return {'error': str(e)}, 500

class Contact(Resource):
    def post(self):
        try:
            data = request.get_json()

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

            # Send email notification (using dummy email for testing)
            self.send_notification_email(data)

            return {'message': 'Contact form submitted successfully'}, 200

        except Exception as e:
            print(f"Error processing contact form: {str(e)}")
            return {'error': 'Failed to process contact form'}, 500

    def send_notification_email(self, data):
        """Send email notification using environment variables"""
        try:
            # Get email settings from environment variables
            smtp_server = app.config['SMTP_SERVER']
            smtp_port = app.config['SMTP_PORT']
            sender_email = app.config['SENDER_EMAIL']
            sender_password = app.config['SENDER_PASSWORD']
            recipient_email = app.config['RECIPIENT_EMAIL']

            # Create message
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = recipient_email
            msg['Subject'] = f"New Contact Form Submission - {data.get('name')}"

            # Email body
            body = f"""
            New contact form submission from Sweet Ice Delights website:

            Name: {data.get('name')}
            Email: {data.get('email')}
            Phone: {data.get('phone', 'Not provided')}
            Event Type: {data.get('eventType', 'Not specified')}

            Selected Dates: {', '.join(data.get('selectedDates', [])) if data.get('selectedDates') else 'None selected'}

            Message:
            {data.get('message')}

            Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            """

            msg.attach(MIMEText(body, 'plain'))

            # Send email (uncomment when ready to test)
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(sender_email, sender_password)
            text = msg.as_string()
            server.sendmail(sender_email, recipient_email, text)
            server.quit()

            print("✅ Email notification sent successfully!")
            print("📧 Email content:", body)

        except Exception as e:
            print(f"❌ Failed to send email: {str(e)}")
            # Still log the content for debugging
            print("📧 Email content that would have been sent:", body)

# Add resources to API
api.add_resource(Users, '/api/users')
api.add_resource(Flavors, '/api/flavors')
api.add_resource(Contact, '/api/contact')

# Auth routes
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')
api.add_resource(Profile, '/api/profile')
api.add_resource(RefreshToken, '/api/refresh')

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(port=5000, debug=True, host='0.0.0.0')
