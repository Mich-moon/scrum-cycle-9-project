import { useState, useEffect } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonImg, IonInput, IonItemDivider, IonPage, IonRow, IonText, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import Header from '../components/header';
import './Signup.css';

const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const onSubmit = (data:any) => {
        console.log(data);
        setData(data);
        submitForm(data);
    };

    async function submitForm( data:any ) {
        let formData = new FormData();

        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('photo', data.photo);

        const csrf_response = await fetch("http://localhost:8080/api/v2/csrf-token")
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(csrf_response);
        formData.append( 'csrf_token', String(csrf_response.csrf_token) );

        let form_data_json = JSON.stringify( Object.fromEntries(formData.entries()) );
        console.log(form_data_json);
        
        const result = await fetch("http://localhost:8080/api/v2/signup", {
            method: "post",
            body: formData,
            headers: {
                'X-CSRFToken': String(csrf_response.csrf_token),
            }
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(result);

        setShowToast(true);
        setMessage(result.message);

    }

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <Header />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {/*   <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Blank2</IonTitle>
                    </IonToolbar>
                </IonHeader> */}
                <form id="signUpForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <IonGrid className='ion-margin' id='signup-grid'>
                        <IonRow></IonRow>
                        <IonRow id='signup-row2'>
                            <IonCol id='signup-col1'>
                                <IonTitle id='signup-title-left'>Create an Account Today!</IonTitle>
                                <IonImg id='signup-img' src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='signup image'/>
                            </IonCol>
                            <IonCol id='signup-col2'>
                                <IonTitle className='ion-padding-bottom' id='signup-title-right'>Signup</IonTitle>

                                <IonInput {...register("firstName", { required: true })} placeholder='Firstname' clearInput></IonInput>
                                {errors.firstName && <span>This field is required</span>}

                                <IonInput {...register("lastName", { required: true })} placeholder='Lastname' clearInput></IonInput>
                                {errors.lastName && <span>This field is required</span>}

                                <IonInput {...register("email", { required: true })} type='email' placeholder='Email Address' clearInput></IonInput>
                                {errors.email && <span>This field is required</span>}

                                <IonInput {...register("password", { required: true })} type='password' placeholder='Password' clearInput></IonInput>
                                {errors.password && <span>This field is required</span>}

                                <IonInput {...register("passwordConfirm", { required: true })} type='password' placeholder='Confirm Password' clearInput></IonInput>
                                {errors.passwordConfirm && <span>This field is required</span>}

                                <IonItemDivider id='signup-photo-upload'>
                                    <IonLabel color='light'>Upload Your Profile Photo:</IonLabel>
                                    <input {...register("photo")} type='file' id='imginput' accept='image/*'/>
                                    {errors.photo && <span>This field is required</span>}
                                </IonItemDivider>    
                                <IonItemDivider id='signup-btn-div'>                            
                                    <IonButton type="submit" id='signup-btn' fill='solid'>Create Account</IonButton>         
                                </IonItemDivider>                      
                            </IonCol>
                        </IonRow>
                        <IonRow></IonRow>
                    </IonGrid>
                </form>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message= {message}
                    duration={5000}
                    buttons={[
                        {
                          side: 'start',
                          icon: close,
                          handler: () => {
                            setShowToast(false);
                          }
                        }
                      ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Signup;
