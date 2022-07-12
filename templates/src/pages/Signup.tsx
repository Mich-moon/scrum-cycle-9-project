import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonImg, IonInput, IonItemDivider, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/header';
import './Signup.css';

const Signup: React.FC = () => {
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

            <IonGrid className='ion-margin' id='signup-grid'>
                <IonRow></IonRow>
                <IonRow id='signup-row2'>
                    <IonCol id='signup-col1'>
                        <IonTitle id='signup-title-left'>Create an Account Today!</IonTitle>
                        <IonImg id='signup-img' src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='signup image'/>
                    </IonCol>
                    <IonCol id='signup-col2'>
                        <IonTitle className='ion-padding-bottom' id='signup-title-right'>Signup</IonTitle>
                        <IonInput placeholder='Firstname' clearInput></IonInput>
                        <IonInput placeholder='Lastname' clearInput></IonInput>
                        <IonInput type='email' placeholder='Email Address' clearInput></IonInput>
                        <IonInput type='password' placeholder='Password' clearInput></IonInput>
                        <IonInput type='password' placeholder='Confirm Password' clearInput></IonInput>
                        <IonItemDivider id='signup-photo-upload'>
                            <input type='file' id='imginput' accept='image/*'/>
                        </IonItemDivider>    
                        <IonItemDivider id='signup-btn-div'>                            
                            <IonButton id='signup-btn' fill='solid'>Create Account</IonButton>         
                        </IonItemDivider>                      
                    </IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Signup;
