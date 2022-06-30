import os
import datetime
from flask import Flask, render_template, jsonify, flash, Response
from flask import request, redirect, url_for, session, send_from_directory, sessions
from werkzeug.utils import secure_filename
from app import app, db
from .forms import EventsForm, SignupForm, LoginForm
from .models import User, Event
from werkzeug.security import check_password_hash
from app import jwt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required

# home page


@app.route('/')
def home():
    return render_template('home.html')


# about page
@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/signup', methods=["GET", "POST"])
def signup_page():
    form = SignupForm()
    return render_template('signup.html', form=form)


@app.route('/api/v1/signup', methods=["POST"])
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


@app.route('/uploads/<string:filename>')
def get_image(filename):
    """Return image from uploads folder."""
    return send_from_directory(os.path.join(os.getcwd(), app.config['UPLOAD_FOLDER'][0:]), filename)


# login page - ds
"""
This should accept: full name, email, password, profile_photo

The role (e.g. an admin user or regular user) , created_at an userid will be automatically generated
Users can be appointed as an admin by the Main Admin.
Send a request to be an admin. If approve then the user status must be chnaged to admin, otherwise they remain as a regular user
"""


@app.route('/login', methods=["GET", "POST"])
def login_page():
    form = LoginForm()
    return render_template('login.html', form=form)


@app.route('/api/login', methods=["POST"])
def login():
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

            #next_page = request.args.get('next')
            # return redirect(url_for('home'))#needs to be changed
        else:
            flash('Invalid email or password', 'error')

    return jsonify(message="Login Failed", errors=form_errors(form)), 400


@app.route('/api/users/<user_id>', methods=["GET"])
def get_user(user_id):
    """Get Details of a user"""
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


@app.route('/events', methods=["GET", "POST"])
def event_page():
    form = EventsForm()
    return render_template('create_event_form.html', form=form)


@app.route('/api/users/<user_id>/events', methods=["GET", "POST"])
def get_user_events(user_id):
    """Get Details of an event for a user ane create event"""

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
                updated_at=datetime.datetime.utcnow()  # need to work on this
            )

            db.session.add(event)
            db.session.commit()
            # app.logger.debug(full_name)
            flash("Event Successfully Created")
            # return redirect(url_for('home'))

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


@app.route('/api/users/<user_id>/events/<event_id>', methods=["PUT", "DELETE"])
def edit_user_events(user_id):
    """Update and Delete event for user"""
    user_event = db.session.query(Event).get(int(event_id))

    if request.method == 'PUT':
        if user_event is not None:
            request_data = request.get_json()
            Event.update_event(
                id,
                request_data["title"],
                request_data["start_date"],
                request_data["end_date"],
                request_data["description"],
                request_data["venue"],
                request_data["flyer"],
                request_data["website"],
                request_data["updated_at"]
            )
            event = db.session.query(Event).get(int(event_id))

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

        if user_event is not None:
            db.session.delete(user_event)
            db.session.commit()

            return jsonify(message="Item deleted"), 200

        return jsonify(message="Item not found"), 404

    return jsonify(message=""), 400


# admin user page - sr
"""
Perform the RUD operations on the user page (Read, update event status and delete events)
They should have a masterlist of all events
They can filter by status 
Add admin username beside the even they approved. 
  On the events_table there should be a column called approved by [String] and approved at [date]
"""


# @app.route('/admin/<userid>')
@app.route('/admin', methods=['GET'])
def admin_page():
    return jsonify({'Events': Event.get_all_events()})


'''@app.route('/admin', methods=['POST'])
def add_event():
    request_data = request.get_json()
    Event.add_event(request_data["title"], request_data["start_date"],request_data["end_date"],request_data["description"],request_data["venue"],request_data["flyer"],request_data["website"],request_data["updated_at"])
    response = Response("Event added", status=201, mimetype='application/json')
    return response'''


@app.route('/admin/<int:id>', methods=['GET'])
def get_event_by_id(id):
    return_value = Event.get_event(id)
    return jsonify(return_value)


@app.route('/admin/<int:id>', methods=['PUT'])
def update_event(id):
    request_data = request.get_json()
    Event.update_event(id, request_data["title"], request_data["start_date"], request_data["end_date"], request_data["description"],
                       request_data["venue"], request_data["flyer"], request_data["website"], request_data["updated_at"])
    response = Response("Event Updated", status=200,
                        mimetype='application/json')
    return response


@app.route('/admin/<int:id>', methods=['DELETE'])
def remove_event(id):
    Event.delete_movie(id)
    response = Response("Event Deleted", status=200,
                        mimetype='application/json')
    return response


# normal user page - ag&mm
"""
  Perform the CRUD operations on the user page
  if we feel good we can add a calendar 
"""


@app.route('/profile')
def userprofile():
    return render_template('user.html')

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
