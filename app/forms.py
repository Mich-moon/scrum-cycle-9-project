from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField
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
