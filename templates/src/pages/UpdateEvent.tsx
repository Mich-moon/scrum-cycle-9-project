import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import './UpdateEvent.css';

const UpdateEvent: React.FC = () => {
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

            <IonGrid className='ion-margin' id='update-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='update-col2'>
                        <IonTitle className='ion-padding-bottom' id='update-title'>UPDATE EVENT</IonTitle>
                        <IonInput value='Title' clearInput></IonInput>
                        <IonInput value='Description' clearInput></IonInput>
                        <IonInput value='Email Address' clearInput></IonInput>
                        <IonInput value='Venue' clearInput></IonInput>
                        <IonInput  value='Website Url' clearInput></IonInput>
                        <IonItemDivider id= 'start'>
                            <IonLabel color='primary'>Start Date</IonLabel>
                            <input type="datetime-local" id="startdate" name="startdate"/>
                        </IonItemDivider>
                        <IonItemDivider id='end'>
                            <IonLabel color='primary'>End Date</IonLabel>
                            <input type="datetime-local" id="enddate" name="enddate"/>
                        </IonItemDivider>
                        <IonItemDivider id='flyer-photo-upload'>
                            <IonLabel color='primary'>Add a Flyer</IonLabel>
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>  
                        <IonButtons class='ion-justify-content-center'>                      
                            <IonButton id='update-btn' fill='solid' color='primary'>Update</IonButton>    
                            <IonButton id='update-btn' fill='solid' color='primary'>Delete</IonButton>     
                        </IonButtons>       
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
