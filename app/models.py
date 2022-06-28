from turtle import update
from app import db
from werkzeug.security import generate_password_hash
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    profile_photo = db.Column(db.String(255))
    role = db.Column(db.String(15), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, name, email, password, photo, role):
        self.full_name = name
        self.email = email
        self.password = generate_password_hash(
            password, method='pbkdf2:sha256')
        self.profile_photo = photo
        self.role = role

    def __repr__(self):
        return '<User %r>' % self.full_name
    
class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(128), nullable=False)
    start_date = db.Column(db.DateTime())
    end_date = db.Column(db.DateTime())
    description = db.Column(db.String(1028), nullable=False)
    venue= db.Column(db.String(128), nullable=False)
    flyer = db.Column(db.String(225))
    wesbite =  db.Column(db.String(225))
    status= db.Column(db.String(15), nullable=False)
    uid = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime())

    def __init__(self,title, start_date, end_date, description, venue, flyer,website, status, uid, date_created, date_updated):
        self.title = title
        self.star_date = start_date
        self.end_date = end_date
        self.description = description
        self.venue= venue
        self.flyer = flyer
        self.website = website 
        self.status = status
        self.uid = uid
        self.created_at = date_created
        self.updated_at = date_updated
