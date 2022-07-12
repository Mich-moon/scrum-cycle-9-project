from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config
import os
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

jwt = JWTManager(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import views