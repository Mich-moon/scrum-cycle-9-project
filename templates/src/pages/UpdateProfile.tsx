import { Storage } from '@capacitor/storage';
import { useState } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonTitle, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar, IonToast, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './UpdateProfile.css';

const UpdateProfile: React.FC = () => {
    const router = useIonRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isAdmin, setRole] = useState<String | null>('false');
    //const [user_id, setID] = useState<String | null>('false');

    const onSubmit = (data:any) => {
        //console.log(data);
        setData(data);
        submitForm(data);
    };

    useIonViewWillEnter(() => {
        getClaims();

        async function getClaims() {
            // get role from capacitor storage
            //const user_is_admin_value = await Storage.get({ key: 'user_is_admin' });
            //const user_is_admin = user_is_admin_value;
            //console.log( user_is_admin );

            let user_is_admin = localStorage.getItem("user_is_admin");
            setRole(user_is_admin);
            //console.log(user_is_admin);

            //let user_id = localStorage.getItem("user_id");
            //setID(user_id);
            //console.log(user_id);
        }

    }, [])

    async function submitForm( data:any ) {

        let formData = new FormData();

        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('photo', data.photo[0]);

        const csrf_response = await fetch("http://localhost:8080/api/v2/csrf-token")
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        //console.log(csrf_response);
        formData.append( 'csrf_token', csrf_response.csrf_token );

        let form_data_json = JSON.stringify( Object.fromEntries(formData.entries()) );
        console.log(form_data_json);

        let jwt = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/users/" + user_id, {
            method: "put",
            body: formData,
            headers: {
                "Authorization" : "Bearer " + jwt
            }
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(result);

        setMessage(result.message);
        setShowToast(true);

    }

  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                {isAdmin == "false" && <Header />}
                {isAdmin == "true" && <AdminHeader />}
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        {/*   <IonHeader collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'>Blank2</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <form id="signUpForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <IonGrid className='ion-margin' id='updateProfile-grid'>
                    <IonRow></IonRow>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol id='updateProfile-col2'>
                            <IonTitle className='ion-padding-bottom' id='updateProfile-title'>Update Profile</IonTitle>
                            <IonAvatar class= "center">
                                <img id='profile-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='profile photo'/>
                        </IonAvatar>
                        <IonInput {...register("firstName", { required: true })} placeholder='Firstname' clearInput></IonInput>
                                {errors.firstName && <span>Firstname is required</span>}

                                <IonInput {...register("lastName", { required: true })} placeholder='Lastname' clearInput></IonInput>
                                {errors.lastName && <span>Lastname is required</span>}

                                <IonInput {...register("email", { required: true })} type='email' placeholder='Email Address' clearInput></IonInput>
                                {errors.email && <span>email is required</span>}

                                <IonInput {...register("password", { required: true })} type='password' placeholder='Password' clearInput></IonInput>
                                {errors.password && <span>password is required</span>}

                                <IonInput {...register("passwordConfirm", { required: true })} type='password' placeholder='Confirm Password' clearInput></IonInput>
                                {errors.passwordConfirm && <span>confirmation is required</span>}

                                <IonItemDivider id='signup-photo-upload'>
                                    <IonLabel color='light'>Upload Your Profile Photo:</IonLabel>
                                    <input {...register("photo")} type='file' id='imginput' accept='image/*'/>
                                    {errors.photo && <span>Photo is required</span>}
                            </IonItemDivider>
                            <IonItemDivider id='updateProfile-btn-div'>
                                <IonButton type="submit" id='updateProfile-btn' fill='solid'>Update</IonButton>
                            </IonItemDivider>
                        </IonCol>
                        <IonCol></IonCol>
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

export default UpdateProfile;
