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
    end_date = DateField('End Date',validators=[InputRequired()]) # Validate the end_date
    
    status= SelectField('Status',
                            validators=[InputRequired()],
                            choices=[
                                (1, 'Pending'),
                                (2, 'Published'),
                            ])
    flyer = FileField('Flyer',validators=[
        FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')
        ])
        
    website = StringField('Website URL', validators=[InputRequired()])