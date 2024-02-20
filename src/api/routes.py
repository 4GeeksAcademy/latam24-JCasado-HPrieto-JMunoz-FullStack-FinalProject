from api.models import db, User, Product, Services, Review, FairyProducts
from flask import Flask, request, jsonify, Blueprint, current_app
from api.utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
import re
import os



app = Flask(__name__)

CORS(app)

api = Blueprint('api', __name__)



# -------------------------------------------------------------------------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------------------------------------------------------------
# Register / Login:



def check(email):
    expression = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if re.fullmatch(expression, email):

        return True
    else:
        return False
    
load_dotenv()

app = Flask(__name__)

api = Blueprint('api', __name__)




@api.route("/register", methods=['POST'])
def register_user():

    try: 
        body = request.get_json()
        name = body.get("name", None)
        surname = body.get("surname", None),
        email = body.get("email", None)
        password = body.get("password", None)
        phone = body.get("phone", None),
        address = body.get("address", None),
        role = body.get("role", None)
        date_of_birth = body.get("date_of_birth", None)

        if name is None or email is None or password is None:

            return {"message": "This field is required"}, 400
    
        hashed_password = current_app.bcrypt.generate_password_hash(password).decode("utf-8")

        user = User(name=name, surname=surname, email=email, password=hashed_password, address=address, role=role, phone=phone, date_of_birth=date_of_birth)
        db.session.add(user)
        db.session.commit()

        return {"message": f"user {user.email} was created"}, 201
    
    except Exception as error:

        print(f"Error during user registration: {error}")
        db.session.rollback()  

        return {"error": "Internal server error", "authorize": False}, 500



@api.route("/login", methods=['POST'])
def login():

    body = request.get_json()
    email = body.get("email", None)
    password = body.get('password', None)

    if email is None or password is None:

        return {"message": "email address or password incorrect", "authorize": False}, 400    
    
    user = User.query.filter_by(email=email).first()

    if user is None:

        return {"message": "User not found", "authorize": False}, 400

    if current_app.bcrypt.check_password_hash(user.password, password):

        token = create_access_token(identity=email)

        return {"token": token}, 200
    
    return {"message": "Unauthorized", "authorize": False}, 401



@api.route("/profile/user")
@jwt_required()
def validate_user():

    email = get_jwt_identity()
    user = User.query.filter.by(email=email).one_or_none()

    if user is None:

        return {"message": "User not found"}, 401

    return user.serialize(), 200



# -------------------------------------------------------------------------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------------------------------------------------------------
# Services / Products:



@api.route("/add_product_to_user", methods=['POST'])
def add_product():

    data = request.json
    user_id = data.get("user_id")
    product_id = data.get("product_id")

    if not user_id or not product_id:

        return jsonify({"message": "User ID and Product ID are required"}), 400

    new_fairy_product = FairyProducts(user_id=user_id, product_id=product_id)
    db.session.add(new_fairy_product)
    db.session.commit()

    return jsonify({"message": "Product added to user successfully"}), 200



@api.route("/users_by_product/<int:product_id>", methods=['GET'])
def get_users_by_product(product_id):

    users = User.query.join(FairyProducts).filter(FairyProducts.product_id == product_id).all()

    if not users:

        return jsonify({'message': "No users found for the specified product"}), 404

    user_list = [{"id": user.id, "name": user.name} for user in users]

    return jsonify({"users": user_list}), 200




# @api.route("/users_by_product/<int:product_id>", methods=['GET'])
# def get_users_with_all_products():

#     users = User.query.join(FairyProducts).filter(FairyProducts.product_id == product_id).all()

#     if not users:

#         return jsonify({'message': "No users found for the specified product"}), 404

#     user_list = [{"id": user.id, "name": user.name} for user in users]

#     return jsonify({"users": user_list}), 200

 


@api.route("/products/<int:service_id>", methods=['GET'])
def get_service_id(service_id):
    
    try:
        
        product = Product.query.filter_by(service_id).all

        if product is None:

            return jsonify({'error': 'Service not found'}), 404

        serialized_service = [product.serialize() for product in product]

        return jsonify(serialized_service), 200

    except Exception as error:
        
        print(error)

        return jsonify({'error': 'Internal server error'}), 500



@api.route("/services", methods=['GET'])
def get_services():

    services = Services.query.all()

    services_list = []

    for service in services:

        services_data = service.serialize()
        services_list.append(services_data)

    return jsonify(services_list)



@api.route("/serviceCategories/<int:category_id>", methods=['GET'])
def get_service_category(category_id):

    serviceCategories = Services.query.filter_by(service_category=category_id).all()

    serialized_services = [service.serialize() for service in serviceCategories]

    print (serviceCategories)

    return jsonify(serialized_services)