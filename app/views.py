from flask import Flask, render_template, jsonify, flash
from app import app
from .forms import ContactForm
from .models import User

#home page
@app.route('/')
def hello_world():
    # example without a template
    return 'Hello, World!'


""" 
#about page 
@app.route('/about')
def about():
    return render_template('about.html') 
"""

#sign up page
"""
The user enters their email and password
"""

#login page
"""
This should accept: full name, email, password, profile_photo

The role (e.g. an admin user or regular user) , created_at an userid will be automatically generated
Users can be appointed as an admin by the Main Admin.
Send a request to be an admin. If approve then the user status must be chnaged to admin, otherwise they remain as a regular user
"""


#normal user page
"""
  Perform the CRUD operations on the user page
  if we feel good we can add a calendar 
"""


#admin user page
"""
  Perform the RUD operations on the user page (Read, update event status and delete events)
 They should have a masterlist of all events
 They can filter by status 
 Add admin username beside the even they approved. 
    On the events_table there should be a column called approved by [String] and approved at [date]
"""


@app.route('/profile/<username>')
def profile(username=None):
    return render_template('profile.html', username=username)

@app.route('/contact', methods=["GET", "POST"])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        full_name = form.full_name.data # or request.form['full_name']
        email = form.email.data # or request.form['email']
        message = form.message.data # or request.form['message']

        app.logger.debug(full_name)

    for error in form.email.errors:
        app.logger.error(error)
        flash(error)

    return render_template('contact_form.html', form=form)

@app.route('/api/tasks')
def tasks():
    tasks = [{'id': 1, 'title': 'Teach Class'}, {'id': 2, 'title': 'Go have lunch'}]
    return jsonify(tasks=tasks)