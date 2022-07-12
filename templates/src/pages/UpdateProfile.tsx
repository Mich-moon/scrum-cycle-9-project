import { IonButton, IonCol, IonContent, IonGrid, IonTitle, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './UpdateProfile.css';

const UpdateProfile: React.FC = () => {
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
            <IonGrid className='ion-margin' id='updateProfile-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol id='updateProfile-col2'>
                        <IonTitle className='ion-padding-bottom' id='updateProfile-title'>Update Profile</IonTitle>
                        <IonAvatar class= "center">
                            <img id='profile-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='profile photo'/>
                       </IonAvatar>
                        <IonInput value='Firstname' clearInput></IonInput>
                        <IonInput value='Lastname' clearInput></IonInput>
                        <IonInput value='Email Address' clearInput></IonInput>
                        <IonInput  value='Password' clearInput></IonInput>
                        <IonItemDivider id='profile-photo-upload'>
                            
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>
                        <IonItemDivider id='updateProfile-btn-div'>
                            <IonButton id='updateProfile-btn' fill='solid' href="./profile">Update</IonButton>
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

export default UpdateProfile;
