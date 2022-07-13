import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './ViewEvent.css';

const ViewEvent: React.FC = () => {
  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <Header />
                <AdminHeader />
                {/* only show admin header if the user role is admin */}
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
                        <IonImg id='view-img' src={process.env.PUBLIC_URL + '/assets/images/login_image.png'} alt='view image'/>
                    </IonCol>
                    <IonCol id='view-col2'> 
                        <IonItemDivider>
                            <IonLabel id="label">Title:</IonLabel>
                        <IonText>Title</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel id="label">Description:</IonLabel>
                        <IonText >Description</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel id="label">Venue:</IonLabel>
                        <IonText>Venue</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel id="label">Website Url:</IonLabel>
                        <IonText >Url</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel id="label">Start Date:</IonLabel>
                        <IonText >DD-MM-YYYY</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel id="label">End Date:</IonLabel>
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
