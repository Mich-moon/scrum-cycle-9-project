import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import UserHeader from '../components/userHeader';
import './UpdateEvent.css';

const UpdateEvent: React.FC = () => {
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

            <IonGrid className='ion-margin' id='update-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='updateEvent-col2'>
                        <IonTitle className='ion-padding-bottom' id='updateEvent-title'>Update Event</IonTitle>
                        <IonInput value='Title' clearInput></IonInput>
                        <IonInput value='Description' clearInput></IonInput>
                        <IonInput value='Venue' clearInput></IonInput>
                        <IonInput  value='Website Url' clearInput></IonInput>
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
                        <IonItemDivider id='updateEvent-btn-div'>
                            <IonButton id='updateEvent-btn' fill='solid'>Update</IonButton>
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

export default UpdateEvent;
