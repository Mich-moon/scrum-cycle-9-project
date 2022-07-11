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
