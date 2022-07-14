import './adminHeader.css';
import { IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonItem, IonList, IonPopover } from '@ionic/react';
import { menu } from 'ionicons/icons';
import { useRef, useState } from 'react';

interface ContainerProps { }

const AdminHeader: React.FC<ContainerProps> = () => {
    
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
  
    const openPopover = (e: any) => {
      popover.current!.event = e;
      setPopoverOpen(true);
    };

  return (
    <><IonToolbar color='primary' className='ion-hide-lg-down'>
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
      
      <IonToolbar id='mobile-menu' className='ion-hide-lg-up'>
              <IonButton onClick={openPopover} id='menu-btn'>
                  <IonIcon icon={menu}></IonIcon>
              </IonButton>
              <IonPopover ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
                  <IonContent>
                      <IonList id='menu-items'>
                          <IonItem href='./main' target='_self'>Home</IonItem>
                          <IonItem href='./addAdmin' target='_self'>Add New Admin</IonItem>
                          <IonItem href='./profile' target='_self'>Profile</IonItem>
                          <IonItem href='./home' target='_self'>Logout</IonItem>
                      </IonList>
                  </IonContent>
              </IonPopover>
          </IonToolbar></>
  );
};

export default AdminHeader;