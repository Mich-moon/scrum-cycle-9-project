from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SelectField,DateField
from wtforms.validators import InputRequired, Email, Length
from flask_wtf.file import FileField, FileAllowed

class ContactForm(FlaskForm):
    full_name = StringField('Full Name', validators=[InputRequired()])
    email = StringField('Email', validators=[Email()])
    message = TextAreaField('Message', validators=[InputRequired()])

class SignupForm(FlaskForm):
    full_name = StringField('Full Name', validators=[InputRequired(), Length(1, 50)])
    email = StringField('Email', validators=[Email(), InputRequired(), Length(1, 64)])
    password = PasswordField('Password', validators=[
        InputRequired()])
    photo = FileField('Image upload', validators=[
        FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')
    ])

class EventsForm(FlaskForm):
    title = StringField('Title', validators=[InputRequired()])
    description = TextAreaField('Description', validators=[InputRequired()])
    venue = StringField('Venue', validators=[InputRequired()])
    start_date = DateField('Start Date', validators=[InputRequired()])
    end_date = DateField('End Date',validators=[InputRequired()]) 
    flyer = FileField('Flyer',validators=[
        FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')
        ])
        
    website = StringField('Website URL', validators=[InputRequired()])
    
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[Email(), InputRequired(), Length(1, 64)])
    password = PasswordField('Password', validators=[
        InputRequired()])

class UpdateEventsForm(FlaskForm):
    title = StringField('Title', validators=[], id="title")
    description = TextAreaField('Description', validators=[], id="description")
    venue = StringField('Venue', validators=[], id="venue")
    start_date = DateField('Start Date', validators=[], id="start_date")
    end_date = DateField('End Date',validators=[], id="end_date") 
    flyer = FileField('Flyer',validators=[
        FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')
        ], id="flyer")
        
    website = StringField('Website URL', validators=[], id="website")

class SearchEventsForm(FlaskForm):
    status = StringField('Status', validators=[], id="status")