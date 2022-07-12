import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState } from 'react';
import UserHeader from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Main.css';
import { getRoles } from '@testing-library/react';

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
    const [user_is_admin, setRole] = useState([false]);

    useIonViewWillEnter(() => {
        getEvents();
        getRole();

        async function getEvents() {
            // get token from capacitor storage
            const jwt_value  = await Storage.get({ key: 'jwt' });
            const token = jwt_value;
            console.log(token);

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

        async function getRole() {
            const user_is_admin_value = await Storage.get({ key: 'user_is_admin' });
            const user_is_admin = user_is_admin_value;
            console.log(user_is_admin);
            user_is_admin !== null ? JSON.parse(user_is_admin) : ""; 
            //setRole(user_is_admin);
        }

    }, [])


    return (
        <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <UserHeader />
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
                
                                        <IonCard>
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title1</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                            </IonCardContent>
                                        </IonCard>
                                        <IonCard>
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title2</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                            </IonCardContent>
                                        </IonCard>                                    
                                        <IonCard>
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title3</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                            </IonCardContent>
                                        </IonCard>
                                    </IonSlide>
                                    <IonSlide>
                                        <IonCard>
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                Keep close to Nature's heart... and break clear away, once in awhile,
                                                and climb a mountain or spend a week in the woods. Wash your spirit clean.
                                            </IonCardContent>
                                        </IonCard>
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

