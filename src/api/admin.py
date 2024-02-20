
import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Product, Orders, Services, OrderedServices, Rating, Review, ServiceCategories, FairyProducts
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Services, db.session))
    admin.add_view(ModelView(ServiceCategories, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(FairyProducts, db.session))
    admin.add_view(ModelView(Orders, db.session))
    admin.add_view(ModelView(OrderedServices, db.session))
    admin.add_view(ModelView(Rating, db.session))
    admin.add_view(ModelView(Review, db.session))