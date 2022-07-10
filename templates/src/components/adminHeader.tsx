import './adminHeader.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const adminHeader: React.FC<ContainerProps> = () => {
  return (    
        <IonToolbar color='primary'>
            <IonButtons id='home-btns' class='ion-justify-content-end'>
                <IonButton id='home-btn1' color='primary' href='/home' target='_self'>
                    Home
                </IonButton>
                <IonButton id='home-btn2'  color='primary' href='./Signup' target='_self'>
                    Signup
                </IonButton>
                <IonButton id='home-btn3' fill='solid' color='primary' href='./Login' target='_self'>
                    Login
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default adminHeader;