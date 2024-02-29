from api.models import db, User, Product, Services, Review, FairyProducts, ServiceCategories
from flask import Flask, request, jsonify, Blueprint, current_app
from api.utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
import re
import os
import base64
import requests

api = Blueprint('api', __name__)

CORS(api)


# -------------------------------------------------------------------------------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------------------------------------------------------------
# Register / Login:



def check(email):
    expression = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if re.fullmatch(expression, email):

        return True
    else:
        return False
    

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

        return jsonify({"token": token, "user": user.serialize()}), 200
    
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
@jwt_required()
def add_product():

    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()

    if user is None:

        return jsonify({"message": "Invalid user"}), 401

    data = request.json

    products = data.get("products") 

    if products is None:

        return jsonify({"message": "Products are required"}), 400
    
    for product in products: 

        product_in_db = Product.query.filter_by(id=product["id"]).one_or_none()

        if product_in_db is None:

            return jsonify({"message": "Product not found"}), 404
        
        new_fairy_product = FairyProducts(user_id=user.id, product_id=product_in_db.id)
        db.session.add(new_fairy_product)
    db.session.commit()

    return jsonify({"message": "Product added to user successfully"}), 200


def verify_records(ids):

    users = []

    for user in User.query.all():

        user_records = FairyProducts.query.filter_by(user_id=user.id).all()

        if user_records:

            user_record_ids = [fairy_product.id for fairy_product in user_records]

            # if set(ids).issubset(set(user_record_ids)):

            print(user)

            users.append(user.serialize_fairies())

    print(users)

    return users



# Using the same endpoint for both fairies and clients:

@api.route("/users_with_all_products", methods=['POST'])
def get_users_with_all_products():

    body = request.get_json()
    ids = body.get("ids", None)

    users = verify_records(ids)

    return jsonify({"users": users}), 200



# To be used at paymentView:

@api.route("/get_user/<int:user_id>", methods=['GET'])
def get_user(user_id):

    try:
        
        user = User.query.get(user_id)

        if user:

            return jsonify(user.serialize_fairies()), 200
        
        else:

            return jsonify({"error": "User not found"}), 404

    except Exception as e:

        return jsonify({"error": str(e)}), 500




@api.route("/users_by_product/<int:product_id>", methods=['GET'])
def get_users_by_product(product_id):

    users = User.query.join(FairyProducts).filter(FairyProducts.product_id == product_id).all()

    if not users:

        return jsonify({'message': "No users found for the specified product"}), 404

    user_list = [{"id": user.id, "name": user.name} for user in users]

    return jsonify({"users": user_list}), 200
 



@api.route("/products/<int:service_id>", methods=['GET'])
def get_service_id(service_id):
    
    try:
        
        product = Product.query.filter_by(service_id=service_id).all()

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



@api.route("/categories", methods=['GET'])
def get_categories():

    categories = ServiceCategories.query.all()

    return jsonify({"categories":[category.full_serialize() for category in categories]})



@api.route("/serviceCategories/<int:category_id>", methods=['GET'])
def get_service_category(category_id):

    serviceCategories = Services.query.filter_by(service_category=category_id).all()

    serialized_services = [service.full_serialize() for service in serviceCategories]

    print (serviceCategories)

    return jsonify(serialized_services)

# PAYPAL ______________________________________________________________________________________________________

@app.route("/create/paypal", methods=['POST'])
def create_paypal_order():
    
    paypal_client = os.environ.get("PAYPAL_CLIENT_ID")
    paypal_client_secret = os.environ.get("PAYPAL_CLIENT_SECRET")
    
    body = request.json
    products = body.get("products", None)
    
    if products is None:
        return jsonify({"Error":"the product is not defined"}), 400
    
    products_in_db = []
    
    for product in products:
        
        created_products = Product.query.filter(product).one_or_none()
        
        if created_products is None:
            return jsonify({"Error":"This product does not exist"}), 404
        
        products_in_db.append(created_products)

    paypal_products = [{
        
        "name": product.name, 
        "unit_amount": {
            "currency_code":"USD",
            "value": product.price
        },
        "quantity": 1,
        } for product in products_in_db]
    
    total_value = sum( product.price for product in products_in_db)
    
    order = {
        
        "intent":"CAPTURE",
        
        "application_context": {
          "brand_name":"Tremy",
          "landing_page":"NO_PREFERENCE",
          "use_action":"PAY_NOW",
        },
        
        "purchase_units": [{
            "amount": {
                "currency_code":"USD",
                "value": total_value,
                "breakdown": {
                    "item_total": {
                        "currency_code":"USD",
                        "value": total_value,
                    }
                }
            },
            "items": paypal_products,
        }]
    }
    
    headers = {
        "Authorization":f"Basic {base64.b64encode(f'{paypal_client}:{paypal_client_secret}'.encode()).decode()}" 
    }
    response = requests.post("https://api.sandbox.paypal.com/v2/checkout/orders", headers = headers, json = order)
    
    if response.status_code == 201:
        order_data = response.json()
        return jsonify({"order_id":order_data["id"]})
    
    return jsonify(response.json()), response.status_code