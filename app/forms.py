from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField, SelectField,DateField
from wtforms.validators import InputRequired, Email, Length
from flask_wtf.file import FileField, FileAllowed
from wtforms.fields import DateTimeLocalField

class ContactForm(FlaskForm):
    first_name = StringField('First Name', validators=[InputRequired()])
    last_name = StringField('Last Name', validators=[InputRequired()])
    email = StringField('Email', validators=[Email()])
    message = TextAreaField('Message', validators=[InputRequired()])

class SignupForm(FlaskForm):
    first_name = StringField('First Name', validators=[InputRequired(), Length(1, 30)])
    last_name = StringField('Last Name', validators=[InputRequired(), Length(1, 30)])
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
    start_date = DateTimeLocalField('Start Date', validators=[InputRequired()],format='%Y-%m-%dT%H:%M')
    end_date = DateTimeLocalField('End Date',validators=[InputRequired()],format='%Y-%m-%dT%H:%M') 
    flyer = FileField('Flyer',validators=[
        FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')
        ])
        
    website = StringField('Website URL', validators=[InputRequired()])
    
class LoginForm(FlaskForm):
    email = StringField('Email', validators=[Email(), InputRequired(), Length(1, 64)])
    password = PasswordField('Password', validators=[
        InputRequired()])
