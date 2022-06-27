import os
from flask import Flask, render_template, jsonify, flash
from flask import request, redirect, url_for, session, send_from_directory
from werkzeug.utils import secure_filename
from app import app, db
from .forms import ContactForm, SignupForm
from .models import User

# home page


@app.route('/')
def home():
    return "Home"


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


@app.route('/login')
def login():
    return


# normal user page - ag&mm
"""
  Perform the CRUD operations on the user page
  if we feel good we can add a calendar 
"""


@app.route('/profile/<userid>')
def user_page():
    return


# admin user page - sr
"""
Perform the RUD operations on the user page (Read, update event status and delete events)
They should have a masterlist of all events
They can filter by status 
Add admin username beside the even they approved. 
  On the events_table there should be a column called approved by [String] and approved at [date]
"""


@app.route('/admin/<userid>')
def admin_page():
    return


@app.route('/profile/<username>')
def profile(username=None):
    return render_template('profile.html', username=username)


@app.route('/contact', methods=["GET", "POST"])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        full_name = form.full_name.data  # or request.form['full_name']
        email = form.email.data  # or request.form['email']
        message = form.message.data  # or request.form['message']

        app.logger.debug(full_name)

    for error in form.email.errors:
        app.logger.error(error)
        flash(error)

    return render_template('contact_form.html', form=form)


@app.route('/api/tasks')
def tasks():
    tasks = [{'id': 1, 'title': 'Teach Class'},
             {'id': 2, 'title': 'Go have lunch'}]
    return jsonify(tasks=tasks)
