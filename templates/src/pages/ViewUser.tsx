import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar } from '@ionic/react';
import AdminHeader from '../components/adminHeader';
import './ViewUser.css';

const ViewUser: React.FC = () => {
  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <AdminHeader />
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        {/*   <IonHeader collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'>Blank2</IonTitle>
                </IonToolbar>
            </IonHeader> */}

            <IonGrid className='ion-margin' id='ViewUser-grid'>
                <IonRow></IonRow>
                <IonRow id='ViewUser-row2'>
                    
                    <IonCol id='ViewUser-col2'>
                       {/* <IonTitle className='ion-padding-bottom' id='ViewUser-title-right'>Signup</IonTitle>*/}
                       <IonAvatar class= "center">
                            <img id='ViewUser-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='user photo'/>
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
                        <IonItemDivider id="ViewUser-btn-div"> 
                        {/* for admins */}
                             <IonButton id='ViewUser-btn' fill='solid'>Make Admin</IonButton>   
                             <IonButton id='ViewUser-btn' fill='solid'>Make User</IonButton>   
                        </IonItemDivider>        
                    </IonCol> 
                </IonRow> 
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default ViewUser;
