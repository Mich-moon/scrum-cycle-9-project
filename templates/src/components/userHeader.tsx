import './userHeader.css';
import { IonToolbar, IonButtons, IonButton } from '@ionic/react';

interface ContainerProps { }

const userHeader: React.FC<ContainerProps> = () => {
  return (    
        <IonToolbar color='primary'>
            <IonButtons id='user-btns' class='ion-justify-content-center'>
                <IonButton id='user-btn1' href='./main' target='_self'>
                    Main
                </IonButton>
                <IonButton id='user-btn2' href='./createEvent' target='_self'>
                    Create Event
                </IonButton>
                <IonButton id='user-btn3' href='./profile' target='_self'>
                    Profile
                </IonButton>
                {/* hover over profile button and it gives the name of the user*/}
                <IonButton id='user-btn4' fill='solid' href='./home' target='_self'>
                    Logout
                </IonButton>
            </IonButtons>
        </IonToolbar>
  );
};

export default userHeader;