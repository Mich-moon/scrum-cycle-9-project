import './adminHeader.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const adminHeader: React.FC<ContainerProps> = () => {
  return (
    <IonToolbar color='primary'>
            <IonButtons id='admin-btns' class='ion-justify-content-end'>
                <IonButton id='admin-btn1' href='./main' target='_self'>
                    Main
                </IonButton>
                <IonButton id='admin-btn2' href='./home' target='_self'>
                    Profile
                </IonButton>
                {/* hover over profile button and it gives the name of the user*/}
                <IonButton id='admin-btn3' fill='outline' href='./home' target='_self'>
                    Logout
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default adminHeader;