import './header.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const header: React.FC<ContainerProps> = () => {
  return (    
        <IonToolbar>
            <IonButtons id='home-btns'>
                <IonButton slot='primary' color='primary' id='home-btn1' href='/home' target='_self'>
                    Home
                </IonButton>
                <IonButton  slot='primary' fill='outline' color='primary' id='home-btn2' href='./Signup' target='_self'>
                    Signup
                </IonButton>
                <IonButton  slot='primary' fill='solid' color='primary' id='home-btn3' href='./Login' target='_self'>
                    Login
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default header;