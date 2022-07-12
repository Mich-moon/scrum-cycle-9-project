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

            <IonGrid className='ion-margin' id='login-grid'>
                <IonRow></IonRow>
                <IonRow id='login-row2'>
                    <IonCol id='login-col1'>
                        <IonTitle id='login-title-left'>Welcome Back!</IonTitle>
                        <IonImg id='login-img' src={process.env.PUBLIC_URL + '/assets/images/login_image.png'} alt='login image'/>
                    </IonCol>
                    <IonCol id='login-col2'>
                        <IonTitle className='ion-padding-bottom' id='login-title-right'>Login</IonTitle>
                        <IonInput type='email' placeholder='Email Address' clearInput></IonInput>
                        <IonInput type='password' placeholder='Password' clearInput></IonInput>
                        <IonItemDivider id='login-btn-div'>
                        <IonButton id='login-btn'>Login</IonButton>     
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
