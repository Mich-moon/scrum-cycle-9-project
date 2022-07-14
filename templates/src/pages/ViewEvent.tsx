import { Storage } from '@capacitor/storage';
import { IonButton, IonCol, IonContent,IonToast, IonSearchbar, useIonRouter, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem, useIonViewWillEnter, IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { close } from 'ionicons/icons';
import UserHeader from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './ViewEvent.css';
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

const ViewEvent: React.FC = () => {
    const router = useIonRouter();
    const [searchText, setSearchText] = useState('');
    const [event, setEvents] = useState([]);
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [venue, setVenue] = useState();   
    const [website, setWebsite] = useState();
    const [flyer, setFlyer] = useState('');
    const [start_date, setStart] = useState();
    const [end_date, setEnd] = useState();
    const [searchEvents, setSearchEvents] = useState([]);
    const [isAdmin, setRole] = useState<String | null>('false');
    const [user_id, setID] = useState<String | null>('');

    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    //let user_is_admin = "false";
    useIonViewWillEnter(() => {
        //search();
        getEvent();
        getClaims();

        async function getEvent() {
            // get token from capacitor storage
            //const jwt_value  = await Storage.get({ key: 'jwt' });
            //const token = jwt_value;
            //console.log(jwt_value);

            let token = localStorage.getItem("jwt");
            console.log(token);

            let url = window.location.href;
            const id = url.split("/").pop();
            const result = await fetch("http://localhost:8080/api/v2/events/"+id, {
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

            if ("event" in result) {
                console.log(result.event);
                //setEvents(result.event)
                setId(result.event.id);
                setTitle(result.event.title);
                setDescription(result.event.description);
                setVenue(result.event.venue);
                setWebsite(result.event.website);
                setFlyer(result.event.flyer);
                setStart(result.event.start_date);
                setEnd(result.event.end_date);
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

    async function deltevent() {
        let url = window.location.href;
        const id = url.split("/").pop();
        let jwt = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/events/" + id, {
            method: "delete",
            headers: {
                "Authorization" : "Bearer " + jwt
            }
        })
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(result)

        if (result.message=="Item deleted") {
            router.push("/main", "forward", "push");
        }
    }

    async function changeStatus(status:string) {

        console.log("role change");
        let url = window.location.href;
        const id = url.split("/").pop();
        let token = await localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/events/" + id + "?status=" + status, {
            method: "put",
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

        setMessage(result.message);
        setShowToast(true);
        console.log(result.message);
        if ("event" in result){
            console.log(result.event);
        }

    }
    //console.log(event);
  return (
    <IonPage>
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                    {isAdmin == "false" && <UserHeader />}
                    {isAdmin == "true" && <AdminHeader />}
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
                        <IonImg id='view-img' src={'http://localhost:8080/api/v2/uploads/'+flyer} alt='view image'/>
                        
                    </IonCol>
                    <IonCol id='view-col2'> 
                        <IonItemDivider>
                            <IonLabel>Title:</IonLabel>
                        <IonText>{title}</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Description:</IonLabel>
                        <IonText >{description}</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Venue:</IonLabel>
                        <IonText>{venue}</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Website Url:</IonLabel>
                        <IonText >{website}</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>Start Date:</IonLabel>
                        <IonText >{start_date}</IonText>
                        </IonItemDivider>
                        <IonItemDivider>
                            <IonLabel>End Date:</IonLabel>
                        <IonText >{end_date}</IonText>
                        </IonItemDivider>
                        {isAdmin == "false" && <IonItemDivider id='view-btn-div'>                            
                        <IonButton id='view-btn1' fill='outline' color={'white'} href={'/updateEvent/'+id}>Update Event</IonButton>  
                            <IonButton id='view-btn2'  onClick={deltevent} fill='solid'>Delete Event</IonButton>         
                        </IonItemDivider> }
                        {/* if the user is an admin then this div below should be shown */}
                    {isAdmin == "true" && <IonItemDivider id='view-btn-div'>                            
                            <IonButton onClick={ () => changeStatus("Published")} id='view-btn1' fill='outline' color={'white'}>Publish Event</IonButton>   
                            <IonButton id='view-btn2' onClick={deltevent} fill='solid'>Delete Event</IonButton>         
                        </IonItemDivider> }                     
                    </IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
            <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message= {message}
                        duration={5000}
                        buttons={[
                            {
                            side: 'start',
                            icon: close,
                            handler: () => {
                                setShowToast(false);
                            }
                            }
                        ]}
                    />
        </IonContent>
    </IonPage>
  );
};

export default ViewEvent;
