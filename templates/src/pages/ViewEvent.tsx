import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import './ViewEvent.css';

const ViewEvent: React.FC = () => {
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

            <IonGrid className='ion-margin' id='view-grid'>
                <IonRow></IonRow>
                <IonRow id='view-row2'>
                    <IonCol id='view-col1'>
                        <IonTitle id='view-title-left'>Event Information</IonTitle>
                        <IonImg id='view-img' src={process.env.PUBLIC_URL + '/assets/images/view_image.png'} alt='view image'/>
                    </IonCol>
                    <IonCol id='view-col2'> 
                        <IonItemDivider>
                            <IonLabel>Title:</IonLabel>
                        <IonText>Title</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Description:</IonLabel>
                        <IonText >Description</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Venue:</IonLabel>
                        <IonText>Venue</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Website Url:</IonLabel>
                        <IonText >Url</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Start Date:</IonLabel>
                        <IonText >DD-MM-YYYY</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>End Date:</IonLabel>
                        <IonText >DD-MM-YYYY</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='view-btn-div'>                            
                            <IonButton id='view-btn1' fill='outline' color={'white'} href='/updateEvent'>Update Event</IonButton>   
                            <IonButton id='view-btn2' fill='solid'>Delete Event</IonButton>         
                        </IonItemDivider> 
                        {/* if the user is an admin then this div below should be shown */}
                        <IonItemDivider id='view-btn-div'>                            
                            <IonButton id='view-btn1' fill='outline' color={'white'} href='/main'>Publish Event</IonButton>   
                            <IonButton id='view-btn2' fill='solid'>Delete Event</IonButton>         
                        </IonItemDivider>                      
                    </IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default ViewEvent;
