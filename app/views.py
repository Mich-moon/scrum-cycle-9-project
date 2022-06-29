import os
import datetime
from flask import Flask, render_template, jsonify, flash, request
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


# sign up page - mw
"""
The user enters their email and password
"""


@app.route('/api/v1/signup', methods=["GET", "POST"])
def signup():
    """Route for signup."""

    form = SignupForm()

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

        flash('Signup successful', 'success')
        next_page = request.args.get('next')
        return redirect(url_for('home'))

    return render_template('signup.html', form=form)


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
            return jsonify(message="Login Successful", access_token=access_token)
            #flash('Login successful', 'success')
            #next_page = request.args.get('next')
            # return redirect(url_for('home'))#needs to be changed
        else:
            flash('Invalid email or password', 'error')

    return jsonify(message="Login Failed")


# admin user page - sr
"""
Perform the RUD operations on the user page (Read, update event status and delete events)
They should have a masterlist of all events
They can filter by status 
Add admin username beside the even they approved. 
  On the events_table there should be a column called approved by [String] and approved at [date]
"""


@app.route('/admin')
def admin_page():
    return


# normal user page - ag&mm
"""
  Perform the CRUD operations on the user page
  if we feel good we can add a calendar 
"""


@app.route('/events', methods=["GET", "POST", "DELETE", "PUT"])
def events():
    form = EventsForm()

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
            uid=1,  # need to work on this
            date_updated=datetime.datetime.utcnow()  # need to work on this
        )

        db.session.add(event)
        db.session.commit()
        # app.logger.debug(full_name)
        flash("Event Successfully Created")
        return redirect(url_for('home'))

    for error in form.errors:
        app.logger.error(error)
        flash(error)

    return render_template('create_event_form.html', form=form)


@app.route('/profile')
def userprofile():
    return render_template('user.html')
