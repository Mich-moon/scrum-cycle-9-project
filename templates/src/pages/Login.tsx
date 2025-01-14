import { Storage } from '@capacitor/storage';
import { useState } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItemDivider, IonPage, IonRow, IonText, IonTitle, IonToolbar, IonToast, useIonRouter } from '@ionic/react';
import Header from '../components/header';
import './Login.css';

const Login: React.FC = () => {
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

        formData.append('email', data.email);
        formData.append('password', data.password);

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
        
        const result = await fetch("http://localhost:8080/api/v2/login", {
            method: "post",
            body: formData,
            headers: {
                'X-CSRFToken': csrf_response.csrf_token
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
            localStorage.setItem("user_id", user_id);

            router.push("/main", "forward", "push");
        }
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
                <form id="loginForm" onSubmit={handleSubmit(onSubmit)} >
                    <IonGrid className='ion-margin' id='login-grid'>
                        <IonRow></IonRow>
                        <IonRow id='login-row2'>
                            <IonCol id='login-col1'>
                                <IonTitle id='login-title-left'>Welcome Back!</IonTitle>
                                <IonImg id='login-img' src={process.env.PUBLIC_URL + '/assets/images/login_image.png'} alt='login image'/>
                            </IonCol>
                            <IonCol id='login-col2'>
                                <IonTitle className='ion-padding-bottom' id='login-title-right'>Login</IonTitle>
                                
                                <IonInput {...register("email", { required: true })} type='email' placeholder='Email Address' clearInput></IonInput>
                                {errors.email && <span>Email is required</span>}

                                <IonInput {...register("password", { required: true })} type='password' placeholder='Password' clearInput></IonInput>
                                {errors.password && <span>Password is required</span>}

                                <IonItemDivider id='login-btn-div'>
                                    <IonButton type="submit" id='login-btn'>Login</IonButton>     
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

export default Login;
