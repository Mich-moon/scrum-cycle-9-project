import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState } from 'react';
import UserHeader from '../components/userHeader';
import './Main.css';

interface Event {
    id: number,
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    venue: string;
    flyer: string;
    website: string;
    status: string;
    uid: number;
    created_at: string;
    updated_at: string;
}

const Main: React.FC = () => {

    const [events, setEvents] = useState([]);

    useIonViewWillEnter(() => {
        getEvents();

        async function getEvents() {
            // get token from capacitor storage
            const value  = await Storage.get({ key: 'jwt' });
            const token = value;

            const result = await fetch("http://localhost:8080/api/v2/events", {
                method: "get",
                headers: {
                    "Authorization" : "Bearer " + token
                }
            })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            });

            if ("events" in result) {
                setEvents(result.events);
            }
        }

    }, [])

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <UserHeader />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {/*   <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Blank2</IonTitle>
                    </IonToolbar>
                </IonHeader> */}

                <IonGrid className='ion-margin' id='signup-grid'>
                    <IonRow>
                        <IonCol id='main-row1'>
                            <IonTitle>YOUR UPCOMING EVENTS</IonTitle>

                            {events.map((event: Event, index:number) => (
                                <IonCard key={event.id}>
                                    <IonImg src={event.flyer} alt='image for event' />
                                    <IonCardHeader>
                                        <IonCardSubtitle>{event.venue}</IonCardSubtitle>
                                        <IonCardTitle>{event.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        {event.description}
                                    </IonCardContent>
                                </IonCard> 
                            ))}
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    Keep close to Nature's heart... and break clear away, once in awhile,
                                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                </IonCardContent>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    <IonCardTitle>Card Title</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    Keep close to Nature's heart... and break clear away, once in awhile,
                                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol id='main-row2'>
                            <IonTitle className='ion-padding-bottom' id='signup-title'>VIEWS EVENT <i>to be updated</i></IonTitle>
                            <IonInput placeholder='Firstname' clearInput></IonInput>
                            <IonInput placeholder='Lastname' clearInput></IonInput>
                            <IonInput type='email' placeholder='Email Address' clearInput></IonInput>
                            <IonInput type='password' placeholder='Password' clearInput></IonInput>
                            <IonInput type='password' placeholder='Confirm Password' clearInput></IonInput>
                            <IonItemDivider id='signup-photo-upload'>
                                <IonLabel color='primary'>Add a Profile Photo</IonLabel>
                                <input type='file' id='imginput' accept='image/*'/>
                            </IonItemDivider>
                            <IonButton id='signup-btn' fill='solid' color='primary'>Create Account</IonButton>           
                        </IonCol>
                    </IonRow>
                    <IonRow></IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Main;
