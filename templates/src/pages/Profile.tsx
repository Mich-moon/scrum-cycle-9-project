import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <Header />
                <AdminHeader />
                {/* only show admin header if the user role is admin */}
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        {/*   <IonHeader collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'>Blank2</IonTitle>
                </IonToolbar>
            </IonHeader> */}

            <IonGrid className='ion-margin' id='profile-grid'>
                <IonRow></IonRow>
                <IonRow id='profile-row2'>
                    
                    <IonCol id='profile-col2'>
                       {/* <IonTitle className='ion-padding-bottom' id='profile-title-right'>Signup</IonTitle>*/}
                       <IonAvatar class= "center">
                            <img id='profile-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='profile photo'/>
                       </IonAvatar>
                       <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Firstname:</IonLabel>
                            <IonText> Firstname</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Lastname:</IonLabel>
                            <IonText> Lastname</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Email:</IonLabel>
                            <IonText>Email </IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Password:</IonLabel>
                            <IonText>Password</IonText>
                        </IonItemDivider> 
                        <IonItemDivider id="edit-btn-div">
                             <IonButton id='profile-btn2' fill='outline' color={'white'} href="./updateProfile">Delete</IonButton>
                             <IonButton id='profile-btn' fill='solid' href="./updateProfile">Edit</IonButton>
                        </IonItemDivider>
                    </IonCol> 
                </IonRow> 
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Profile;
