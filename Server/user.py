from flask import Blueprint, request, jsonify
from models import db, User, Transaction
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from functools import wraps

load_dotenv()


jwt_secret_key = os.getenv("JWT_TOKEN")
user_bp = Blueprint('user_bp', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        print("Token: ", token)
        if not token:
            return jsonify({'message': 'Token is missing'}), 403

        try:
            data = jwt.decode(token, jwt_secret_key, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Invalid token'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    # Check if data is present
    if not data:
        return jsonify({"message": "No data provided"}), 400

    # Validate received data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({"message": "Missing required fields"}), 400
    
    # Check if the user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already taken"}), 409
    
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    try:
        db.session.add(new_user)
        db.session.commit()

        # Generate a token for the new user
        payload = {
            'user_id': new_user.id,
            'exp': datetime.utcnow() + timedelta(days=1) # Token expires in 1 day
        }
        token = jwt.encode(payload, jwt_secret_key, algorithm='HS256')
        return jsonify({'token': token, "message": "User registered successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()

    if user and user.check_password(data.get('password')):
        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
        }
        token = jwt.encode(payload, jwt_secret_key, algorithm='HS256')

        user_data = {
            'username': user.username,
            'email': user.email,
            'credit': user.credit,
            'id': user.id
            # Add any other user fields you need
        }
        
        return jsonify({'token': token, 'user': user_data})

    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@user_bp.route('/update_credit/<int:user_id>', methods=['POST'])
def update_user_credit(user_id):
    # Get the user by ID
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Get amount and transaction type from the request
    amount = request.json.get('amount')
    transaction_type = request.json.get('transaction_type')

    # Update the user's credit
    updated_credit = user.update_credit(amount, transaction_type)

    return jsonify({"message": "Credit updated", "new_credit": updated_credit})