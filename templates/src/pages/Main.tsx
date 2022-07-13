import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import UserHeader from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Main.css';
import { getRoles } from '@testing-library/react';
import { contractOutline, filter } from 'ionicons/icons';

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
    const [searchEvents, setSearchEvents] = useState([]);
    const [isAdmin, setRole] = useState<String | null>('false');
    const [user_id, setID] = useState<String | null>('');

    //let user_is_admin = "false";

    useIonViewWillEnter(() => {
        //search();
        getUpcomingEvents();
        getClaims();

        async function getUpcomingEvents() {
            // get token from capacitor storage
            //const jwt_value  = await Storage.get({ key: 'jwt' });
            //const token = jwt_value;
            //console.log(jwt_value);

            let token = localStorage.getItem("jwt");
            console.log(token);

            // TO CHANGE - /api/v2/events/search?date=upcoming
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

        async function getClaims() {
            // get role from capacitor storage
            //const user_is_admin_value = await Storage.get({ key: 'user_is_admin' });
            //const user_is_admin = user_is_admin_value;
            //console.log( user_is_admin );

            let user_is_admin = localStorage.getItem("user_is_admin");
            setRole(user_is_admin);
            console.log(user_is_admin);

            let user_id = localStorage.getItem("user_id");
            setID(user_id);
            console.log(user_id);
        }

    }, [])


    // for searchbar
    useEffect(() => {

        let token = localStorage.getItem("jwt");
        const result = fetch("http://localhost:8080/api/v2/events", {
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
            //setSearchEvents(result.events);
        }
    }, [searchText])

    async function filter( filter:string ) {

        let token = localStorage.getItem("jwt");
        if (filter == "Your Events") {
            const result = await fetch("http://localhost:8080/api/v2/events/users/" + {user_id}, {
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
                setSearchEvents(result.events);
            }
        } 

    }

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    {isAdmin == "false" && <UserHeader />}
                    {isAdmin == "true" && <AdminHeader />}
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
                                    <IonSelect 
                                        placeholder='Select Events' 
                                        ok-text='Ok' 
                                        cancel-text='Cancel' 
                                        id='search-filter' 
                                        onIonChange={(e) => {
                                          console.log(e.detail.value);
                                          filter(e.detail.value);
                                        }}
                                    >
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
                                {events.map((event: Event, index:number) => (
                                    <IonItem href='/viewEvent' key={event.id}>
                                        {event.title}
                                        {event.description} 
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonCol>                    
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Main;
