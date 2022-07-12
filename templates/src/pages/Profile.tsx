import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Profile.css';

const Signup: React.FC = () => {
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

            <IonGrid className='ion-margin' id='profile-grid'>
                <IonRow></IonRow>
                <IonRow id='profile-row2'>
                    
                    <IonCol id='profile-col2'>
                       {/* <IonTitle className='ion-padding-bottom' id='profile-title-right'>Signup</IonTitle>*/}
                       <IonAvatar class= "center">
                            <img id='profile-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='profile photo'/>
                       </IonAvatar>
                       <IonItemDivider id='field'>
                            <IonLabel color="light">Firstname:</IonLabel>
                            <IonText> Firstname</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light">Lastname:</IonLabel>
                            <IonText> Lastname</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light">Email:</IonLabel>
                            <IonText>Email </IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light">Password:</IonLabel>
                            <IonText>Password</IonText>
                        </IonItemDivider> 
                        <IonItemDivider id='field'>
                            <IonLabel color="light">Role:</IonLabel>
                            <IonText>Role</IonText>
                        </IonItemDivider> 
                        <IonItemDivider id="edit-btn-div">
                             <IonButton id='profile-btn' fill='solid'>Edit</IonButton>
                        </IonItemDivider>
                        <IonItemDivider id="edit-btn-div"> 
                        {/* for admins */}
                             <IonButton id='profile-btn' fill='solid'>Make Admin</IonButton>   
                             <IonButton id='profile-btn' fill='solid'>Make User</IonButton>   
                        </IonItemDivider>        
                    </IonCol> 
                </IonRow> 
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Signup;
