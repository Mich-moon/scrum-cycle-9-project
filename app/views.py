import os
import datetime
from flask import Flask, render_template, jsonify, flash, Response
from flask import request, redirect, url_for, session, send_from_directory, sessions
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from app import app, db
from .forms import EventsForm, SignupForm, LoginForm, UpdateEventsForm, SearchEventsForm
from .models import User, Event
from werkzeug.security import check_password_hash

import jwt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_wtf.csrf import generate_csrf

# home page


@app.route('/')
def home():
    return jsonify(message="API version 2")


@app.route('/api/v2/signup', methods=["POST"])
def signup():
    """Route for signup."""

    form = SignupForm(obj=request.form)

    if form.validate_on_submit():
        photo = form.photo.data
        photo_filename = secure_filename(photo.filename)
        photo.save(os.path.join(
            os.environ.get('UPLOAD_FOLDER'), photo_filename
        ))

        user = User(
            name=form.full_name.data,
            email=form.email.data,
            password=form.password.data,
            photo=photo_filename,
            role="user"
        )
        db.session.add(user)
        db.session.commit()

        new_id = user.id
        user = db.session.query(User).get(new_id)

        user_json = {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "photo": user.profile_photo,
            "role": user.role,
            "created_at": user.created_at
        }

        flash('Signup successful', 'success')
        return jsonify(user=user_json), 201

    return jsonify(message="Signup Failed", errors=form_errors(form)), 400


@app.route('/api/v2/login', methods=["POST"])
def login():
    """Route for login."""

    form = LoginForm(obj=request.form)

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()

        if user is not None and check_password_hash(user.password, password):
            role = False
            if user.role == "admin":
                role = True
            sub = user.id
            more_claims = {"name": user.full_name, "admin": role}
            access_token = create_access_token(
                sub, additional_claims=more_claims)

            flash('Login successful', 'success')

            return jsonify(message="Login Successful", access_token=access_token)
        else:
            flash('Invalid email or password', 'error')

    return jsonify(message="Login Failed", errors=form_errors(form)), 400


@app.route('/api/v2/logout', methods=["GET"])
@jwt_required()
def logout():
    """Route for logout."""
    return jsonify(message="Logged out")


@app.route('/api/v2/users/<user_id>', methods=["GET", "PUT", "PATCH"])
@jwt_required()
def users(user_id):
    """Route for user details"""
    user = db.session.query(User).get(int(user_id))

    if request.method == 'GET':
        if user is not None:

            user_json = {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "photo": user.profile_photo,
                "role": user.role,
                "created_at": user.created_at
            }

            return jsonify(user=user_json), 200

        return jsonify(message="Item not found"), 404

    elif request.method == 'PUT':
        form = SignupForm(obj=request.form)
        if user is not None:

            # check for user's id
            auth = request.headers.get('Authorization', None)
            token = auth.split()[1]
            payload = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=["HS256"])

            if user.id == int(payload["sub"]):

                if form.validate_on_submit():
                    photo = form.photo.data
                    photo_filename = secure_filename(photo.filename)
                    photo.save(os.path.join(
                        os.environ.get('UPLOAD_FOLDER'), photo_filename
                    ))

                    user.name = form.full_name.data
                    user.email = form.email.data
                    user.password = generate_password_hash(
                        form.password.data, method='pbkdf2:sha256')
                    user.photo = photo_filename

                    db.session.commit()

                    u = db.session.query(User).get(int(user_id))

                    user_json = {
                        "id": u.id,
                        "full_name": u.full_name,
                        "email": u.email,
                        "photo": u.profile_photo,
                        "role": u.role,
                        "created_at": u.created_at
                    }

                    return jsonify(user=user_json), 200

                return jsonify(message="Update Failed", errors=form_errors(form)), 400

            else:
                return jsonify(message="Unauthorized"), 401

        return jsonify(message="Item not found"), 404

    elif request.method == 'PATCH':
        if user is not None:

            # check for admin
            if request.args.get("role"):
                auth = request.headers.get('Authorization', None)
                token = auth.split()[1]
                payload = jwt.decode(
                    token, app.config['SECRET_KEY'], algorithms=["HS256"])

                if payload["admin"] == True:
                    user.role = request.args.get("role")
                    db.session.commit()
                    u = db.session.query(User).get(int(user_id))

                    user_json = {
                        "id": u.id,
                        "full_name": u.full_name,
                        "email": u.email,
                        "photo": u.profile_photo,
                        "role": u.role,
                        "created_at": u.created_at
                    }

                    return jsonify(user=user_json), 200

                else:
                    return jsonify(message="Role update only for admins"), 401

        return jsonify(message="Item not found"), 404


@app.route('/api/v2/events/users/<user_id>', methods=["GET", "POST"])
@jwt_required()
def user_events(user_id):
    """Route for user events"""

    if request.method == 'GET':
        user_events = db.session.query(Event).filter_by(uid=int(user_id)).all()

        if user_events is not None:

            events = [{
                "id": e.id,
                "title": e.title,
                "start_date": e.start_date,
                "end_date": e.end_date,
                "description": e.description,
                "venue": e.venue,
                "flyer": e.flyer,
                "website": e.website,
                "status": e.status,
                "uid": e.uid,
                "created_at": e.created_at,
                "updated_at": e.updated_at
            } for e in user_events]

            return jsonify(events=events), 200

        return jsonify(message="Item not found"), 404

    elif request.method == 'POST':

        form = EventsForm(obj=request.form)

        if form.validate_on_submit():
            title = form.title.data
            start_date = form.start_date.data
            end_date = form.end_date.data
            description = form.description.data
            venue = form.venue.data
            flyer = form.flyer.data
            website = form.website.data
            flyer_filename = secure_filename(flyer.filename)
            flyer.save(os.path.join(
                os.environ.get('UPLOAD_FOLDER'), flyer_filename
            ))

            event = Event(
                title=title,
                start_date=start_date,
                end_date=end_date,
                description=description,
                venue=venue,
                flyer=flyer_filename,
                website=website,
                uid=int(user_id),
                updated_at=datetime.datetime.utcnow()
            )

            db.session.add(event)
            db.session.commit()
            flash("Event Successfully Created")

            new_id = event.id
            event = db.session.query(Event).get(new_id)

            event_json = {
                "id": event.id,
                "title": event.title,
                "start_date": event.start_date,
                "end_date": event.end_date,
                "description": event.description,
                "venue": event.venue,
                "flyer": event.flyer,
                "website": event.website,
                "status": event.status,
                "uid": event.uid,
                "created_at": event.created_at,
                "updated_at": event.updated_at
            }

            return jsonify(event=event_json), 201

        return jsonify(message="Event creation Failed", errors=form_errors(form)), 400


@app.route('/api/v2/events', methods=["GET"])
@jwt_required()
def events_all():
    """Route for events"""
    events = db.session.query(Event).all()

    if events is not None:

        events_json = [{
            "id": e.id,
            "title": e.title,
            "start_date": e.start_date,
            "end_date": e.end_date,
            "description": e.description,
            "venue": e.venue,
            "flyer": e.flyer,
            "website": e.website,
            "status": e.status,
            "uid": e.uid,
            "created_at": e.created_at,
            "updated_at": e.updated_at
        } for e in events]

        return jsonify(events=events_json), 200

    return jsonify(message="Item not found"), 404


@app.route('/api/v2/events/search', methods=["GET"])
@jwt_required()
def events_search():
    """Route for events search"""


@app.route('/api/v2/events/<event_id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def events(event_id):
    """Route for specific events"""
    event = db.session.query(Event).get(int(event_id))

    if request.method == 'GET':

        if event is not None:
            event_json = {
                "id": event.id,
                "title": event.title,
                "start_date": event.start_date,
                "end_date": event.end_date,
                "description": event.description,
                "venue": event.venue,
                "flyer": event.flyer,
                "website": event.website,
                "status": event.status,
                "uid": event.uid,
                "created_at": event.created_at,
                "updated_at": event.updated_at
            }
            return jsonify(event=event_json), 200

        return jsonify(message="Item not found"), 404

    elif request.method == 'PUT':
        if event is not None:

            if request.args.get("title"):
                event.title = request.args.get("title")
            if request.args.get("start_date"):
                event.start_date = request.args.get("start_date")
            if request.args.get("end_date"):
                event.end_date = request.args.get("end_date")
            if request.args.get("description"):
                event.description = request.args.get("description")
            if request.args.get("venue"):
                event.venue = request.args.get("venue")
            if request.args.get("flyer"):
                event.flyer = request.args.get("flyer")
            if request.args.get("website"):
                event.website = request.args.get("website")

            # check for admin
            if request.args.get("status"):
                auth = request.headers.get('Authorization', None)
                token = auth.split()[1]
                payload = jwt.decode(
                    token, app.config['SECRET_KEY'], algorithms=["HS256"])

                if payload["admin"] == True:
                    event.status = request.args.get("status")
                else:
                    return jsonify(message="Status update only for admins"), 401

            event.updated_at = datetime.datetime.utcnow()
            db.session.commit()

            e = db.session.query(Event).get(int(event_id))

            event_json = {
                "id": e.id,
                "title": e.title,
                "start_date": e.start_date,
                "end_date": e.end_date,
                "description": e.description,
                "venue": e.venue,
                "flyer": e.flyer,
                "website": e.website,
                "status": e.status,
                "uid": e.uid,
                "created_at": e.created_at,
                "updated_at": e.updated_at
            }

            return jsonify(message="Event updated", event=event_json), 200

        return jsonify(message="Item not found"), 404

    elif request.method == 'DELETE':

        if event is not None:
            db.session.delete(event)
            db.session.commit()

            return jsonify(message="Item deleted"), 200

        return jsonify(message="Item not found"), 404


@app.route('/api/v2/csrf-token', methods=['GET'])
def get_csrf():
    return jsonify({'csrf_token': generate_csrf()})


@app.route('/uploads/<string:filename>')
def get_image(filename):
    """Return image from uploads folder."""
    return send_from_directory(os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'][0:]), filename)


# Here we define a function to collect form errors from Flask-WTF
# which we can later use

def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            )
            error_messages.append(message)

    return error_messages
