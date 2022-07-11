import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import UserHeader from '../components/userHeader';
import './CreateEvent.css';

const CreateEvent: React.FC = () => {
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

<<<<<<< Updated upstream
            <IonGrid className='ion-margin' id='create-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='create-col2'>
                        <IonTitle className='ion-padding-bottom' id='create-title'>CREATE EVENT <i>to be updated</i></IonTitle>
                        <IonInput placeholder='Firstname' clearInput></IonInput>
                        <IonInput placeholder='Lastname' clearInput></IonInput>
                        <IonInput type='email' placeholder='Email Address' clearInput></IonInput>
                        <IonInput type='password' placeholder='Password' clearInput></IonInput>
                        <IonInput type='password' placeholder='Confirm Password' clearInput></IonInput>
                        <IonItemDivider id='create-photo-upload'>
                            <IonLabel color='primary'>Add a Profile Photo</IonLabel>
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>                        
                        <IonButton id='create-btn' fill='solid' color='primary'>Create Account</IonButton>           
=======
            <IonGrid className='ion-margin' id='createEvent-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='createEvent-col2'>
                        <IonTitle className='ion-padding-bottom' id='createEvent-title'>CREATE EVENT</IonTitle>
                        <IonInput placeholder='Title' clearInput></IonInput>
                        <IonInput placeholder='Description' clearInput></IonInput>
                        <IonInput placeholder='Email Address' clearInput></IonInput>
                        <IonInput placeholder='Venue' clearInput></IonInput>
                        <IonInput  placeholder='Website Url' clearInput></IonInput>
                        <IonItemDivider>
                            <IonLabel color='primary'>Start Date</IonLabel>
                            <input type="datetime-local" id="startdate" name="startdate"/>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel color='primary'>End Date</IonLabel>
                            <input type="datetime-local" id="enddate" name="enddate"/>
                        </IonItemDivider>
                        <IonItemDivider id='flyer-photo-upload'>
                            <IonLabel color='primary'>Add a Flyer</IonLabel>
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>                     
                        <IonButton id='createEvent-btn' fill='solid' color='primary'>Create Event</IonButton>             
                                      
>>>>>>> Stashed changes
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
