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
