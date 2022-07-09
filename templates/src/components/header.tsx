import './header.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const header: React.FC<ContainerProps> = () => {
  return (    
        <IonToolbar>
            <IonButtons id='home-btns' class='ion-justify-content-end'>
                <IonButton id='home-btn1' color='primary' href='/home' target='_self'>
                    Home
                </IonButton>
                <IonButton id='home-btn2' fill='outline' color='primary' href='./Signup' target='_self'>
                    Signup
                </IonButton>
                <IonButton id='home-btn3' fill='solid' color='primary' href='./Login' target='_self'>
                    Login
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default header;