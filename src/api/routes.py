
from api.models import db, User, Product, Services, ServiceProducts, Rating, Review
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from cloudinary.uploader import upload
from dotenv import load_dotenv
import cloudinary
import os


load_dotenv()

app = Flask(__name__)

api = Blueprint('api', __name__)


def check(email):
    expression = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if re.fullmatch(expression, email):

        return True
    else:
        return False
    

api = Blueprint('api', __name__)


@api.route('/register', methods=['POST'])
def register_user():

    body = request.get_json()
    name = body.get("name", None)
    email = body.get("email", None)
    password = body.get("password", None)

    if name is None or email is None or password is None:

        return {"message": "This field is required"}, 400
    
    bpassword = bytes(password, 'utf-8')
    salt = bcrypt.gensalt()
    
    print("Salt:", salt)
   
    hashed_password = bcrypt.hashpw(bpassword, salt)

    print("Password:", bpassword)
    
    user = User(name, email, hashed_password.decode('utf-8'))
    db.session.add(user)
    
    try: 

        db.session.commit()

        return {"message": f'user {user.email} was created'}, 201
    
    except Exception as error:
        print(error)
    
        return {"error": "Internal server error", "authorize": False}, 500



@api.route('/login', methods=['POST'])
def login():

    body = request.get_json()
    email = body.get('email', None)
    password = body.get('password', None)

    if email is None or password is None:

        return {"message": "email address or password incorrect", "authorize": False}, 400    
    
    if check(email) is not True:

        return {"message": "This email is invalid", "authorize": False}, 400
    
    user = User.query.filter_by(email=email).first()

    if user is None:

        return {"message": "User not found", "authorize": False}, 400
    
    password_byte = bytes(password, 'utf-8')

    if bcrypt.checkpw(password_byte, user.password.encode('utf-8')):

        token = create_access_token(identity=email)

        return {"token": token}, 200
    
    return {"message": "Unauthorized", "authorize": False}, 401



@api.route('/profile/user')
@jwt_required()
def validate_user():

    email = get_jwt_identity()
    user = User.query.filter.by(email=email).one_or_none()

    if user is None:

        return {"message": "User not found"}, 401

    return user.serialize(), 200    
    

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "This is a message from me to myself just to check that everything works well"
    }

    return jsonify(response_body), 200



# def upload_certificate():
#     current_user = get_jwt_identity()
#     cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
#     api_secret=os.getenv('API_SECRET'))
    
#     data = request.get_json()
#     print(data)
#     user = User.query.get(current_user)

#     name = data.get('name')
#     description = data.get('description')

#     product_type = data.get('product_type')
#     user_id = user.id

#     if name is None:
#         return jsonify({"message": "Certificate name required"}), 400

#     db.session.add(Status)
#     db.session.commit()
 
#     return jsonify({"message": "Your new certification has been successfully uploaded"}), 200



@api.route("/product/<int:productid>", methods=["GET"])
def get_product(productid):
    product = Product.query.get(productid)
    
    if product is None:

        return jsonify({"message": "Product not found"}), 404
    
    serialized_product = product.serialize()

    return jsonify(serialized_product), 200



@api.route("/product/<int:productid>/edit", methods=['PUT'])
@jwt_required()
def update_product(productid):
    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("API_KEY"),
        api_secret=os.getenv("API_SECRET")
    )

    current_user = get_jwt_identity()
    product = Product.query.get(productid)
    
    if product is None:
        return jsonify({"message": "Product not found"}), 404
    
    if product.user_id != current_user:
        return jsonify({"message": "You are not authorized"})

    data = request.get_json()

    name = data.get("name")
    price = data.get("price")
    description = data.get("description")

    # product_type = data.get("product_type")

    if name:
        product.name = name

    if price:
        product.price = price

    if description:
        product.description = description

    # if product_type:
    #     product.product_type = product_type

    try:
        db.session.commit()

    except IntegrityError as e:

        db.session.rollback()

        return jsonify({"message": "Error updating the product"}), 500

 

@api.route("/products/<int:service_id>", methods=['GET'])
def get_service_id(service_id):
    
    try:
        
        service = Services.query.get(service_id)

        if service is None:

            return jsonify({'error': 'Service not found'}), 404

        serialized_service = service.serialize()

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



@api.route("/products/<int:service_id>", methods=['GET'])
def get_service_id(service_id):
    
    product = Services.query.filter_by(service_id=service_id).all()

    serlized_products = [product.serialize() for product in product]

    print (product)

    return jsonify(serialized_product)



@api.route("/Search_by_product", methods=['GET'])
def filter_by_product():
    
    products = Product.query.filter_by(product_type="Manicure").all()
    products = Product.query.filter_by(product_type="Pedicure").all()

    serialized_products = [product.serialize() for product in products]

    return jsonify(serialized_products)



@api.route("/Search_by_filter", methods=['GET'])
def search_by_filter():

    service_id = request.args.get("service_id")
    product_type = request.args.get("product_type")
  

    if service_id and service_id != "null":
        products = Product.query.filter_by(product_type=product_type)

    else:
        products = Product.query.filter_by(product_type=product_type)

    if manicure_type is not None:
        products = products.filter(Product.price >= float(manicure_type))

    if pedicure_type is not None:
        products = products.filter(Product.price <= float(pedicure_type))

    products = products.all()

    serialized_products = [product.serialize() for product in products]

    return jsonify(serialized_products)



@api.route('/products/<state>', methods=['GET'])
def get_all_products_by_status(state):

    product_status = status.query.filter_by(status=state).all()

    if product_status:

        ListProducts = [status.product[0].serialize() for status in product_status if status.product]

        return jsonify(ListProducts), 200
    
    return jsonify([]), 200



@api.route('/configuration', methods=['GET'])
@jwt_required()
def configuration():

    current_user = get_jwt_identity()
    user=User.query.filter_by(id=current_user).first()
    response_body = {
        "data": user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/configuration', methods=['PUT'])
@jwt_required()
def update_configuration():

    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    if user is None:

        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    full_name = data.get("full_name")
    email = data.get("email")
    address = data.get("address")
    phone = data.get("phone")
    avatar = data.get("avatar")

    if full_name:
        user.full_name = full_name

    if email:
        user.email = email
    
    if address:
        user.address = address

    if phone:
        user.phone = phone

    if avatar:
        user.avatar = avatar

    try:
        db.session.commit()

        return jsonify({"message": "User data updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()

        return jsonify({"message": "Error updating user data"}), 500
    


@api.route('/configuration/menu', methods=['PUT'])
@jwt_required()
def update_menu_configuration():

    current_user = get_jwt_identity()
    garage = Menu.query.filter(Menu.user_id == current_user).first()

    if menu is None:

        return jsonify({"message": "Menu serch not found"}), 404
    
    data = request.get_json()

    menu.name = data.get('name')
    user.mail = data.get('mail')
    user.phone = data.get('phone')
    user.address = data.get('address')
    product.description = data.get('description')
    product.product_id = data.get('product_id')
    menu.user_id = data.get('user_id')

    print(menu.serialize())
    
    try:
       
        db.session.commit()

        return jsonify({"message": "Menu successfuly found"}), 200
    
    except Exception as e:
        db.session.rollback()

        return jsonify({"message": Exception}), 500



@api.route("/configuration/menu", methods=['DELETE'])
@jwt_required()
def delete_product(menu_id):

    current_user = get_jwt_identity()

    menu = Menu.query.get(menu_id)

    if menu is None:

        return jsonify({"message" : "Menu not found"}), 404
    
    if garage.user_id != current_user:

        return jsonify({"message" : "Authorization required"})
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message" : "Product successfully deleted"}), 200



@api.route("/configuration/password", methods=['PUT'])
@jwt_required()
def update_password():

    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    if user is None:

        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    password = data.get("password")

    if password:
        user.password = password

    try:
        db.session.commit()

        return jsonify({"message": "Password updated successfully"}), 200
    
    except Exception as e:
        db.session.rollback()

        return jsonify({"message": "Error updating password"}), 500



@api.route("/profile/reviews", methods=['POST'])
@jwt_required()
def addReview():

    current_user = get_jwt_identity()
    data = request.get_json()
    product_id = data.get("product_id")
    comment = data.get("comment")

    user = User.query.get(current_user)
    product = Product.query.get(product_id)

    if not product:

        return jsonify({"message": "Producto not found"}), 404

    received_user = User.query.get(product.user_id)

    review = Review(given_review_id=user.id, recived_review_id=received_user.id, product_id=product.id, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Your review has been submited"}), 200



@api.route("/profile/reviews", methods=['GET'])
@jwt_required()
def getReviews():

    current_user = get_jwt_identity()

    reviews = Review.query.filter_by(recived_review_id=current_user).all()
    
    review_list = []

    for review in reviews:  

        product = Product.query.get(review.product_id)

        review_data = {
            
            "product_id": review.product_id,
            "comment": review.comment,
            "given_review_id": review.given_review_id,
            "fairy_name": fairy.name,
            "received_review_id": review.received_review_id,
            "received_user_id": review.received_review_id,
            "image": list(product.images)[0].image
        }

        review_list.append(review_data)

    return jsonify(review_list), 200
