from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    credit = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)
    
    def update_credit(self, amount, transaction_type):
        """
        Update the user's credit and record the transaction.

        :param amount: The amount to update the credit by.
        :param transaction_type: The type of transaction (e.g., "deposit", "win", "loss").
        """
        # Update the credit amount
        self.credit += amount

        # Record the transaction
        transaction = Transaction(
            user_id=self.id,
            amount=amount,
            transaction_type=transaction_type
        )
        db.session.add(transaction)

        # Commit the changes to the database
        db.session.commit()

        return self.credit  # Return the updated credit value for convenience
    
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(50))  # e.g., "deposit", "win", "loss"
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('transactions', lazy=True))