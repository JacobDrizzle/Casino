from flask import Flask, jsonify
from flask_cors import CORS
from user import user_bp
from game import game_bp
from models import db
from dotenv import load_dotenv
import os
import logging

load_dotenv()

db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_port = os.getenv("DB_PORT")
print("Database Host:", os.getenv("DB_HOST"))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.register_blueprint(user_bp)
app.register_blueprint(game_bp)


CORS(app)
db.init_app(app)

logging.basicConfig(level=logging.INFO)

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify(error='Internal server error'), 500

@app.errorhandler(404)
def not_found_error(e):
    return jsonify(error='Resource not found'), 404

@app.after_request
def set_csp(response):
    response.headers["Content-Security-Policy"] = "default-src 'self';"
    return response

@app.after_request
def set_security_headers(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0')