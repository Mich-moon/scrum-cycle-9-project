import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import UserHeader from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Main.css';
import { getRoles } from '@testing-library/react';
import { contractOutline, filter } from 'ionicons/icons';
import { PassThrough } from 'stream';

interface Event {
    id: number;
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

    const [searchText, setSearchText] = useState<string>('');
    const [event_start, setEvent_start] = useState<string>('');
    const [event_end, setEvent_end] = useState<string>('');

    const [events, setEvents] = useState([]);
    const [searchEvents, setSearchEvents] = useState([]);
    const [isAdmin, setRole] = useState<string | null>('false');

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

            const result = await fetch("http://localhost:8080/api/v2/events/search?date=upcoming&status=Published", {
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
                console.log(result.events);
                console.log(result.events.slice(1,3));
            }

            setSearchEvents([]);
            
        }

        async function getClaims() {
            // get role from capacitor storage
            //const user_is_admin_value = await Storage.get({ key: 'user_is_admin' });
            //const user_is_admin = user_is_admin_value;
            //console.log( user_is_admin );

            let user_is_admin = localStorage.getItem("user_is_admin");
            setRole(user_is_admin);
            console.log(user_is_admin);
        }

    }, [])

    async function search() {
        let token = await localStorage.getItem("jwt");

        let url = "";

        if (isAdmin == "false") {
            url = "http://localhost:8080/api/v2/events/search?title="+searchText+"&status=Published";
        } else {
            url = "http://localhost:8080/api/v2/events/search?title="+searchText;
        }

        const result = await fetch(url, {
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
        } else {
            setSearchEvents([]);
        }
    }

    // for searchbar
    useEffect(() => {
        search();
        console.log("searc text "+searchText);
    }, [searchText])


    async function search_date() {
        let token = await localStorage.getItem("jwt");

        let url = '';

        if (event_start == "" || event_end == "") {
            if (isAdmin == "false") {
                url = "http://localhost:8080/api/v2/events/search?event_start="+event_start+"&event_end="+event_end+"&date_range=false+&status=Published";
            } else {
                url = "http://localhost:8080/api/v2/events/search?event_start="+event_start+"&event_end="+event_end+"&date_range=false";
            }

        } else if ( (!(event_start == "")) && (!(event_end == "")) ) {
            if (isAdmin == "false") {
                url = "http://localhost:8080/api/v2/events/search?event_start="+event_start+"&event_end="+event_end+"&date_range=true+&status=Published";
            } else {
                url = "http://localhost:8080/api/v2/events/search?event_start="+event_start+"&event_end="+event_end+"&date_range=true";
            }
        }

        console.log(url);

        const result = await fetch(url, {
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
        } else {
            setSearchEvents([]);
        }
    }
    
    // for date
    useEffect(() => {
        search_date();
        console.log("event start " + event_start );
        console.log("event end " + event_end );
    }, [event_start, event_end])

    async function filter( filter:string ) {

        let start_search = false;
        let token = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");

        let url = '';

        if (filter == "Your Events") {
            start_search = true;
            if (isAdmin == "false") {
                url = "http://localhost:8080/api/v2/events/users/" + user_id;
            } else {
                url = "http://localhost:8080/api/v2/events/users/" + user_id;
            }
    
        } else if (filter == "All Events") {
            start_search = true;
            if (isAdmin == "false") {
                url = "http://localhost:8080/api/v2/events/search?status=Published";
            } else {
                url = "http://localhost:8080/api/v2/events/search";
            }

        } else {
            start_search = false;
        }

        if (start_search == true) {
            const result = await fetch(url, {
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

        } else {
            setSearchEvents([]);
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
                                </IonSlides>
                            </IonCol>                     
                    </IonRow>
                    <IonRow id='main-row2'>
                        <IonCol>
                            <IonItemDivider id='search-div'>
                                <IonSearchbar 
                                    placeholder='Search for Event' 
                                    value={searchText} 
                                    id='searchBar' 
                                    onIonChange={e => {
                                        //console.log(e.detail.value);
                                        setSearchText(e.detail.value!);
                                    }} 
                                    animated={true}></IonSearchbar
                                >
                                {console.log(searchText)}
                            </IonItemDivider>
                            <IonItemDivider id='main-row2-div2'>
                                <IonItemDivider id='date-filter-options'>                                
                                    <IonText>Start Date:</IonText>
                                    <IonInput 
                                        type='datetime-local' 
                                        id='start-date-time'
                                        onIonChange={(e) => {
                                            //console.log(e.detail.value);
                                            setEvent_start(e.detail.value!) ;
                                        }}
                                    ></IonInput>                            
                                    <IonText>End Date:</IonText>
                                    <IonInput 
                                        type='datetime-local' 
                                        id='end-date-time'
                                        onIonChange={(e) => {
                                            //console.log(e.detail.value);
                                            setEvent_end(e.detail.value!) ;
                                        }}
                                    ></IonInput>
                                    <IonSelect 
                                        placeholder='Select Events' 
                                        ok-text='Ok' 
                                        cancel-text='Cancel' 
                                        id='search-filter' 
                                        onIonChange={(e) => {
                                          //console.log(e.detail.value);
                                          filter(e.detail.value);
                                        }}
                                    >
                                        <IonSelectOption>None</IonSelectOption>
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
                                {searchEvents.map((event: Event, index:number) => (
                                    <IonItem href='/viewEvent' key={event.id}>
                                        {/* add ion-input tags for this section */}
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
