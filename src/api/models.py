from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
    
from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class IdDocument(Enum):

    PhotoID = "photoID"

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
    id_document = db.Column(db.Enum(IdDocument), nullable=False, default=IdDocument.Passport)
    address = db.Column(db.String(120), nullable=True) 
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.Client)
    phone = db.Column(db.Integer, nullable=False)
    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    products = db.relationship('Product', backref='user') #(1 to many)
    favorites = db.relationship('Favorites', backref='user') #(1 to many)

    fairy_reviews = db.relationship('Review', backref='fairy_id') 
    client_reviews = db.relationship('Review', backref='client_id')

    services_purchased = db.relationship('services_purchased', backref='user') 

    def __repr__(self):

        return f'<User {self.email}>'

    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "email": self.email,
            "id_document": self.id_document.value,            
            "address": self.address, 
            "role": self.role,
            "phone": self.phone
            
            # do not serialize the password, its a security breach
        }


class Menu(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    services = db.relationship('Service', backref='garage')

    def __repr__(self):

        return f'<Menus {self.id}>'
    
    def serialize(self):

        return {

            "id": self.id,
            "name": self.name,
            "image_id": self.image_id,
            "product_id": self.product_id,
            "user_id": self.user_id
        }
    

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    description = db.Column(db.String(2000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('model.id'))

    def __repr__(self):

        return f'<Products {self.id}>'
    
    def serialize(self):

        return {

            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "user_id": self.user_id,
        }


class Service (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'))
    menu_id = db.Column(db.Integer, db.ForeignKey('garage.id'))

    def __repr__(self):

        return f'<Services {self.id}>'
    
    def serialize(self):

        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_id": self.image_id,
        }

class Rating(Enum):

    ONE_STAR = 1
    TWO_STARS = 2
    THREE_STARS = 3
    FOUR_STARS = 4
    FIVE_STARS = 5

    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    stars = db.Column(db.Enum(Rating), nullable=False) # Revisar Enum con los profes
    comment = db.Column(db.String(250), nullable=True)

    # client = db.relationship('User', foreign_keys=[buyer_id], backref='client_reviews')
    # fairy = db.relationship('User', foreign_keys=[seller_id], backref='fairy_reviews')

    def __repr__(self):

        return f'<Reviews {self.id}>'
    
    def serialize(self):

        return{

            "id": self.id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "product_id": self.product_id,
            "stars": self.stars,
            "comment": self.comment
        }
    
class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    fairy_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    date = db.Column(db.DateTime, nullable=False, default=datetime.now(miami_tz))

    def __repr__(self):

        return f'<Sales {self.id}>'
    
    def serialize(self):

        return{

            "id": self.id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "product_id": self.product_id,
            "taller_id": self.taller_id,
            "fecha": self.fecha
        }
    
class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    models = db.relationship('Model', backref='brands') # Podemos acceder a modelos asociados a una marca 

    def __repr__(self):

        return f'<Brands {self.id}>'
    
    def serialize(self):

        return{

            "id": self.id,
            "name": self.name
        }
    
class Model(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'))

    brands = db.relationship('Brand', backref='models') 
    def __repr__(self):

        return f'<Models {self.id}>'
    
    def serialize(self):

        return{

            "id": self.id,
            "type": self.type
        }