import './adminHeader.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const adminHeader: React.FC<ContainerProps> = () => {
  return (
    <IonToolbar color='primary'>
            <IonButtons id='admin-btns' class='ion-justify-content-center'>
                <IonButton id='admin-btn1' href='./main' target='_self'>
                    Main
                </IonButton>
                <IonButton id='admin-btn2' href='./addAdmin' target='_self'>
                    Add Admin
                </IonButton>
                <IonButton id='admin-btn3' href='./profile' target='_self'>
                    Profile
                </IonButton>
                {/* hover over profile button and it gives the name of the user*/}
                <IonButton id='admin-btn4' fill='solid' href='./home' target='_self'>
                    Logout
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default adminHeader;