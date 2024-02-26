
from flask_sqlalchemy import SQLAlchemy
from enum import Enum 
import pytz



db = SQLAlchemy()



class UserRole(Enum):

    CLIENT = "client"
    FAIRY = "fairy"
    ADMIN = "admin" 



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    address = db.Column(db.String(120), nullable=True) 
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.CLIENT)
    phone = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=True)
    date_of_birth = db.Column(db.String(10), nullable=True)
    professional_title = db.Column(db.String(10), nullable=True)
    avatar = db.Column(db.String(250), unique=False, nullable=True)

    FairyProducts = db.relationship("FairyProducts", backref="user-products")
 

    def __repr__(self):

        return f'<User {self.email}>'

    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surename,
            "email": self.email,
            "date_of_birth": self.date_of_birth,       
            "address": self.address, 
            "role": self.role,
            "phone": self.phone
        }

    def serialize_fairies(self):

        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surename,
            "email": self.email,
            "phone": self.phone,
            "rating": self.rating,
            "professional_title": self.professional_title,
            "avatar": self.avatar
        }


class Services (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    service_category = db.Column(db.Integer, db.ForeignKey("service_categories.id"))
    service_products = db.relationship("Product", backref="services")

    def __repr__(self):

        return f'<Services {self.name}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }

    def full_serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "service_products": [product.serialize() for product in self.service_products]
        }    


class ServiceCategories (db.Model):
    __tablename__ = "service_categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    services = db.relationship("Services", backref="service_categories")

    def __repr__(self):

        return f'<ServiceCategories {self.name}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "name": self.name

        }   
     
    def full_serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "services": [service.serialize() for service in self.services]
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    service_id = db.Column(db.Integer, db.ForeignKey("services.id")) 
    FairyProducts = db.relationship("FairyProducts", backref="Product")

    def __repr__(self):

        return f'<Products {self.id}>'
    
    def serialize(self):

        return {

            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "service_id": self.service_id
        }



class FairyProducts (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    
    def serialize(self):
        user = User.query.get(self.user_id) 

        return {

            "id": self.id,
            "product_id": self.product_id,
            "user": user.serialize_fairies()
        }


class FairySelectedProducts (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))

    def serialize(self):
        user = User.query.get(self.user_id) 

        return {

            "id": self.id,
            "product_id": self.product_id,
            "user": user.serialize_fairies()
        }


class OrderedServices (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id")) #Many to many

    def __repr__(self):

        return f'<Services {self.id}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "order_id": self.order_id,
        }
    


class RatingEnum(Enum):

    ONE_STAR = 1
    TWO_STARS = 2
    THREE_STARS = 3
    FOUR_STARS = 4
    FIVE_STARS = 5


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    description = db.Column(db.String(256), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fairy_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Enum(RatingEnum), nullable=False)
    fairy = db.relationship("User", foreign_keys=[fairy_id])
    client = db.relationship("User", foreign_keys=[client_id]) 


    def __repr__(self):

        return f'<Products {self.id}>'
    
    def serialize(self):

        return {

            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "user_id": self.user_id,
            "service_id": self.service_id
        }



class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    fairy_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    stars = db.Column(db.Enum(RatingEnum), nullable=False) 
    comment = db.Column(db.String(250), nullable=True)

    def __repr__(self):

        return f'<Reviews {self.id}>'
    
    def serialize(self):

        return{

            "id": self.id,
            "client_id": self.client_id,
            "fairy_id": self.fairy_id,
            "stars": self.stars,
            "comment": self.comment
        }

