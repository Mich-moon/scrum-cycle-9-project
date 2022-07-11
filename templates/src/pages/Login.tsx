import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItemDivider, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/header';
import './Login.css';

const Login: React.FC = () => {
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
                <IonRow>
                    <IonCol>
                        <IonTitle>Welcome Back</IonTitle>
                        <IonImg src={process.env.PUBLIC_URL + '/assets/images/login_image.png'} alt='login image'/>
                    </IonCol>
                    <IonCol id='login-col2'>
                        <IonItemDivider>
                        <IonTitle className='ion-padding-bottom' id='login-title'>LOGIN</IonTitle>
                        <IonInput type='email' placeholder='Email Address' clearInput></IonInput>
                        <IonInput type='password' placeholder='Password' clearInput></IonInput>
                        <IonButton id='login-btn' fill='solid' color='primary'>Login</IonButton>     
                        </IonItemDivider>
                              
                    </IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Login;
