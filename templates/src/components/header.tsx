import './header.css';
import React, { useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonList, IonPopover, IonToolbar } from '@ionic/react';
import { menu } from 'ionicons/icons';

interface ContainerProps { }

const Header: React.FC<ContainerProps> = () => {
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
  
    const openPopover = (e: any) => {
      popover.current!.event = e;
      setPopoverOpen(true);
    };
    
  return (    
        <><IonToolbar className='ion-hide-lg-down'>
          <IonButtons id='home-btns' className='ion-justify-content-end'>
              <IonButton id='home-btn1' href='./home' target='_self'>
                  Home
              </IonButton>
              <IonButton id='home-btn2' fill='outline' href='./signup' target='_self'>
                  Signup
              </IonButton>
              <IonButton id='home-btn3' fill='solid' href='./login' target='_self'>
                  Login
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
                          <IonItem href='./home' target='_self'>Home</IonItem>
                          <IonItem href='./signup' target='_self'>Signup</IonItem>
                          <IonItem href='./login' target='_self'>Login</IonItem>
                      </IonList>
                  </IonContent>
              </IonPopover>
          </IonToolbar></>
  );
};

export default Header;