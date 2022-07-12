import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState } from 'react';
import UserHeader from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
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

    const [searchText, setSearchText] = useState('');
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
                    <AdminHeader />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {/*   <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Blank2</IonTitle>
                    </IonToolbar>
                </IonHeader> */}

                <IonGrid className='ion-margin' id='signup-grid'>
                    <IonRow id='main-row1'>
                        <IonCol>
                            <IonItemDivider id='main-title-div'>
                                <IonTitle id='main-title'>UPCOMING EVENTS</IonTitle>
                            </IonItemDivider>                     
                                <IonSlides pager={true}>
                                    <IonSlide>
                                        {events.map((event: Event, index:number) => (
                                            <IonCard key={event.id}>
                                                <IonCardHeader>
                                                    <IonCardTitle>{event.title}</IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    {event.description}
                                                </IonCardContent>
                                            </IonCard> 
                                        ))}
                                        {/* note only 5 cards per slide.. so we have to add this to the counter */}
                                    </IonSlide>
                                </IonSlides>
                        </IonCol>                     
                    </IonRow>
                    <IonRow id='main-row2'>
                        <IonCol>
                            <IonItemDivider id='search-div'>
                                <IonSearchbar placeholder='Search for Event' value={searchText} id='searchBar' onIonChange={e => setSearchText(e.detail.value!)} animated={true}></IonSearchbar>
                                {console.log(searchText)}
                            </IonItemDivider>
                            <IonItemDivider id='main-row2-div2'>
                                <IonItemDivider className='date-filter-options'>                                
                                    <IonText>Start Date:</IonText>
                                    <IonInput type='datetime-local' id='start-date-time'></IonInput>                            
                                    <IonText>End Date:</IonText>
                                    <IonInput type='datetime-local' id='end-date-time'></IonInput>
                                    <IonSelect placeholder='Select Events' ok-text='Ok' cancel-text='Cancel' id='search-filter'>
                                        <IonSelectOption>Your Events</IonSelectOption> 
                                        <IonSelectOption>All Events</IonSelectOption> 
                                    </IonSelect>  
                                <IonItemDivider id='search-div'>
                                    <IonSearchbar placeholder='Search for Event' value={searchText} id='searchBar' onIonChange={e => setSearchText(e.detail.value!)} animated={true}></IonSearchbar>
                                    {console.log(searchText)}
                                </IonItemDivider>
                                <IonItemDivider id='main-row2-div2'>
                                    <IonItemDivider id='date-filter-options'>                                
                                        <IonText>Start Date:</IonText>
                                        <IonInput type='datetime-local' id='start-date-time'></IonInput>                            
                                        <IonText>End Date:</IonText>
                                        <IonInput type='datetime-local' id='end-date-time'></IonInput>
                                        <IonSelect placeholder='Select Events' ok-text='Ok' cancel-text='Cancel' id='search-filter'>
                                            <IonSelectOption>Your Events</IonSelectOption> 
                                            <IonSelectOption>All Events</IonSelectOption> 
                                        </IonSelect>  
                                    </IonItemDivider>
                                </IonItemDivider>                        
                        </IonCol>
                    </IonRow>
                    <IonRow id='main-row3'>
                        <IonCol>
                            <IonList>
                                <IonItem href='/viewEvent'>
                                    1
                                </IonItem>
                                <IonItem href='/viewEvent'>
                                    2
                                </IonItem>
                            </IonList>
                        </IonCol>                    
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Main;
