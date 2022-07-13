import { Storage } from '@capacitor/storage';
import { useState } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonTitle, IonToolbar,IonToast, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import UserHeader from '../components/userHeader';
import './CreateEvent.css';

const CreateEvent: React.FC = () => {
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

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('venue', data.venue);
        formData.append('website', data.website);
        formData.append('start_date', data.startdate);
        formData.append('end_date', data.enddate);
        formData.append('flyer', data.photo[0]);

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
        //let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/events", {
            method: "post",
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
        
        if (result.user) {
            router.push("/main", "forward", "push");
        }
    }
  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <UserHeader />
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        {/*   <IonHeader collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'>Blank2</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <form id="eventForm" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <IonGrid className='ion-margin' id='createEvent-grid'>
                    <IonRow></IonRow>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol id='createEvent-col2'>
                            <IonTitle className='ion-padding-bottom' id='createEvent-title'>Create Event</IonTitle>
                            <IonInput {...register("title", { required: true })} placeholder='Title' clearInput></IonInput>
                                {errors.title && <span>Title is required</span>}
                                <IonInput {...register("description", { required: true })} placeholder='Description' clearInput></IonInput>
                                {errors.description && <span>description is required</span>}
                                <IonInput {...register("venue", { required: true })} placeholder='Venue' clearInput></IonInput>
                                {errors.venue && <span>Venue is required</span>}
                                <IonInput {...register("website", { required: true })} placeholder='Website' clearInput></IonInput>
                                {errors.website && <span>Website is required</span>}
                            <IonItemDivider className='date-filter-options'>
                            <IonInput {...register("startdate", { required: true })} type="datetime-local" placeholder='Start date' clearInput></IonInput>
                                {errors.startdate && <span>Start date is required</span>}
                            </IonItemDivider>
                            <IonItemDivider className='date-filter-options'>
                            <IonInput {...register("enddate", { required: true })} type="datetime-local" placeholder='End date' clearInput></IonInput>
                                {errors.enddate && <span>End date is required</span>}
                            </IonItemDivider>
                            <IonItemDivider id='flyer-photo-upload'>
                                <input {...register("photo")} type='file' id='imginput' accept='image/*'/>
                                    {errors.photo && <span>Photo is required</span>}
                            </IonItemDivider>
                            <IonItemDivider id='createEvent-btn-div'>
                                <IonButton type="submit" id='createEvent-btn' fill='solid'>Create Event</IonButton>
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

export default CreateEvent;
