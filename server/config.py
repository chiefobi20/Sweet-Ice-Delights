import os
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-this-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

# Email configuration
app.config['SMTP_SERVER'] = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
app.config['SMTP_PORT'] = int(os.getenv('SMTP_PORT', 587))
app.config['SENDER_EMAIL'] = os.getenv('SENDER_EMAIL', 'your-test-email@gmail.com')
app.config['SENDER_PASSWORD'] = os.getenv('SENDER_PASSWORD', 'your-app-password')
app.config['RECIPIENT_EMAIL'] = os.getenv('RECIPIENT_EMAIL', 'sweeticedelights.test@gmail.com')

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
api = Api(app)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001"}})

# JWT error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {'message': 'Token has expired'}, 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {'message': 'Invalid token'}, 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return {'message': 'Authorization token is required'}, 401
