import { Storage } from '@capacitor/storage';
import { useState } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonTitle, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar, IonToast, useIonRouter } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './UpdateProfile.css';

const UpdateProfile: React.FC = () => {
    const router = useIonRouter();
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
        formData.append('photo', data.photo[0]);

        const csrf_response = await fetch("http://localhost:8080/api/v2/csrf-token")
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(csrf_response);
        formData.append( 'csrf_token', csrf_response.csrf_token );

        let form_data_json = JSON.stringify( Object.fromEntries(formData.entries()) );
        console.log(form_data_json);

        let token = localStorage.getItem("jwt");
            console.log(token);
            
        const result = await fetch("http://localhost:8080/api/v2/users/<user_id>", {
            method: "put",
            body: formData,
            headers: {
                "Authorization" : "Bearer " + token
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

        if (result.access_token) {
            var jwt_token = result.access_token;
            var base64Url = jwt_token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
                atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );
            //console.log(jsonPayload);

            let jwt_payload = JSON.parse(jsonPayload);

            let user_id = jwt_payload["sub"];
            let first_name = jwt_payload["first_name"];
            let last_name = jwt_payload["last_name"];
            let user_is_admin = jwt_payload["admin"];

            Storage.set({ key: 'jwt', value: JSON.stringify( jwt_token ) });
            Storage.set({ key: 'user_id', value: JSON.stringify( user_id ) });
            Storage.set({ key: 'first_name', value: JSON.stringify( first_name ) });
            Storage.set({ key: 'last_name', value: JSON.stringify( last_name ) });
            Storage.set({ key: 'user_is_admin', value: JSON.stringify( user_is_admin ) });

            localStorage.setItem("jwt", jwt_token);
            localStorage.setItem("user_is_admin", user_is_admin);

            router.push("/profile", "forward", "push");
        }
    }

  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <Header />
                <AdminHeader />
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
        </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
