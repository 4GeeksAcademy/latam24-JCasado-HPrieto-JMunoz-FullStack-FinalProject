
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
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
    password = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(120), nullable=True) 
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.CLIENT)
    phone = db.Column(db.Integer, nullable=False)

    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # products = db.relationship("Product", backref="user") #(1 to many)
    #fairy_reviews = db.relationship("Review", backref="fairy") 
    #client_reviews = db.relationship("Review", backref="client") 

    orders_purchased = db.relationship("Orders", backref="user") 

    def __repr__(self):

        return f'<User {self.email}>'

    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "email": self.email,
                   
            "address": self.address, 
            "role": self.role,
            "phone": self.phone
            
            # do not serialize the password, its a security breach
        }
    


class Services (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    service_products = db.relationship("ServiceProducts", backref="services")

    def __repr__(self):

        return f'<Services {self.id}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_id": self.image_id,
        }
    

    
class ServiceProducts (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"))
    service_id = db.Column(db.Integer, db.ForeignKey("services.id")) #Many to many

    def __repr__(self):

        return f'<Services {self.id}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "product_id": self.product_id,
            "service_id": self.service_id,
        }



class OrderedServices (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    services_id = db.Column(db.Integer, db.ForeignKey("services.id")) #Many to many

    def __repr__(self):

        return f'<Services {self.id}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "order_id": self.order_id,
            "services_id": self.services_id,
        }
    


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    
    service_products = db.relationship("ServiceProducts", backref="products")

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



class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    description = db.Column(db.String(256), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #ordered_services_id = db.Column(db.Integer, db.ForeignKey('ordered_services.id'), nullable=False)
    #services_requested = db.relationship("OrderedServices", backref="orders")

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
    


class RatingEnum(Enum):

    ONE_STAR = 1
    TWO_STARS = 2
    THREE_STARS = 3
    FOUR_STARS = 4
    FIVE_STARS = 5


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Enum(RatingEnum), nullable=False)

    def set_rating_value(self, rating_enum):
        self.value = rating_enum.name

    def get_rating_value(self):
        return RatingEnum[self.value]


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    fairy_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    stars = db.Column(db.Enum(RatingEnum), nullable=False) 
    comment = db.Column(db.String(250), nullable=True)

    # client = db.relationship('User', foreign_keys="client_id")
    # fairy = db.relationship('User', foreign_keys="fairy_id")

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

