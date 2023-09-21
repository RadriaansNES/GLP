from flask import request, jsonify, Blueprint
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from models.users import User
from main import db 

#Blueprint for access through main
main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/register', methods=['POST'])
def register():
    print("Received registration request")
    data = request.json
    username = data['username']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    telephone = data.get('telephone')
    address = data.get('address')
    city = data.get('city')
    postal_code = data.get('postal_code')
    country = data.get('country')

    hashed_password = generate_password_hash(password, method='sha256')
    
    new_user = User(
        username=username,
        first_name=first_name,
        last_name=last_name,
        telephone=telephone,
        address=address,
        city=city,
        postal_code=postal_code,
        country=country,
        hashed_password=hashed_password,
        salt=None  
    )
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message='Registration successful')

@main_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.hashed_password, password):
        login_user(user)
        return jsonify(message='Login successful')
    return jsonify(message='Login failed', error=True)
