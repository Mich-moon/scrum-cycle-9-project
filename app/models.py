from turtle import update
from app import db
from werkzeug.security import generate_password_hash
from datetime import datetime
import json

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    profile_photo = db.Column(db.String(255))
    role = db.Column(db.String(15), default="user")
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, firstname, lastname, email, password, photo):
        self.first_name = firstname
        self.last_name = lastname
        self.email = email
        self.password = generate_password_hash(
            password, method='pbkdf2:sha256')
        self.profile_photo = photo

    def __repr__(self):
        return '<User %r>' % self.email


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(128), nullable=False)
    start_date = db.Column(db.DateTime())
    end_date = db.Column(db.DateTime())
    description = db.Column(db.String(1028), nullable=False)
    venue= db.Column(db.String(128), nullable=False)
    flyer = db.Column(db.String(225))
    website =  db.Column(db.String(225),nullable=False)
    status= db.Column(db.String(15), default="Pending")
    uid = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime())

    def __init__(self,title, start_date, end_date, description, venue, flyer,website, uid, updated_at):
        self.title = title
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.venue= venue
        self.flyer = flyer
        self.website = website 
        self.uid = uid
        self.updated_at = updated_at

    def __repr__(self):
        return '<Event %r>' % self.title


    def json(self):
            return {'id': self.id, 'title': self.title, 'start_date': self.start_date, 'end_date': self.end_date, "description" :self.description, 
            "venue": self.venue, "flyer": self.flyer, "website": self.website, "updated_at": self.updated_at}

    '''def add_event(_title, _start_date, _end_date, _description, _venue, _flyer, _website, _updated_at):
        # creating an instance of our Event constructor
        new_event = Event(title=_title, start_date=_start_date, end_date=_end_date, description=_description, venue=_venue, flyer=_flyer, website=_website, uid= 1, updated_at=_updated_at)
        db.session.add(new_event)  # add new movie to database session
        db.session.commit()'''

    def get_all_events():
        '''function to get all events in our database'''
        return [Event.json(event) for event in Event.query.all()]

    def get_event(_id):
        '''function to get event using the id of the event as parameter'''
        return [Event.json(Event.query.filter_by(id=_id).first())] 

    def update_event(_id, _title, _start_date, _end_date, _description, _venue, _flyer, _website, _updated_at):
        '''function to update the details of a event'''
        event_to_update = Event.query.filter_by(id=_id).first()
        event_to_update.title = _title
        event_to_update.start_date = _start_date
        event_to_update.end_date = _end_date
        event_to_update.description = _description
        event_to_update.venue = _venue
        event_to_update.flyer = _flyer
        event_to_update.website = _website
        event_to_update.updated_at = _updated_at
        db.session.commit()

    def delete_event(_id):
        '''function to delete a event from our database using
        the id of the event'''
        Event.query.filter_by(id=_id).delete()
        # filter event by id and delete
        db.session.commit()
