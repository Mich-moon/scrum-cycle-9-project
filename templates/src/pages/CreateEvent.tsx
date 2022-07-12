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

            <IonGrid className='ion-margin' id='createEvent-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='createEvent-col2'>
                        <IonTitle className='ion-padding-bottom' id='createEvent-title'>Create Event</IonTitle>
                        <IonInput placeholder='Title' clearInput></IonInput>
                        <IonInput placeholder='Description' clearInput></IonInput>
                        <IonInput placeholder='Venue' clearInput></IonInput>
                        <IonInput  placeholder='Website Url' clearInput></IonInput>
                        <IonItemDivider className='date-filter-options'>
                            <IonLabel color='primary'>Start Date:</IonLabel>
                            <IonInput type="datetime-local" id="start-date-time" name="startdate"/>
                        </IonItemDivider>
                        <IonItemDivider className='date-filter-options'>
                            <IonLabel color='primary'>End Date:</IonLabel>
                            <IonInput type="datetime-local" id="end-date-time" name="enddate"/>
                        </IonItemDivider>
                        <IonItemDivider id='flyer-photo-upload'>
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>
                        <IonItemDivider id='createEvent-btn-div'>
                            <IonButton id='createEvent-btn' fill='solid'>Create Event</IonButton>
                        </IonItemDivider>
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
