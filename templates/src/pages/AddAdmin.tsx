import { close } from 'ionicons/icons';
import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonChip, IonToolbar, IonList, IonItem, useIonViewWillEnter, IonToast } from '@ionic/react';
import { useState, useEffect } from 'react';
import AdminHeader from '../components/adminHeader';
import './AddAdmin.css';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    photo: string;
    role: string;
    created_at: string;
}

const AddAdmin: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');

    const [users, setUsers] = useState([]);
    const [isAdmin, setRole] = useState<string | null>('false');

    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    useIonViewWillEnter(() => {
        getUsers();
        getClaims();

        async function getUsers() {
            // get token from capacitor storage
            //const jwt_value  = await Storage.get({ key: 'jwt' });
            //const token = jwt_value;
            //console.log(jwt_value);

            let token = localStorage.getItem("jwt");
            console.log(token);

            const result = await fetch("http://localhost:8080/api/v2/users", {
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

            if ("users" in result) {
                setUsers(result.users);
                console.log(result.users);
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
        }

    }, [message])

    async function search() {
        let token = await localStorage.getItem("jwt");
        const result = await fetch("http://localhost:8080/api/v2/users/search?email=" + searchText, {
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

        if ("users" in result) {
            setUsers(result.users);
        } else {
            setUsers([]);
        }
    }

    // for searchbar
    useEffect(() => {
        search();
        console.log("searc text "+searchText);
    }, [searchText])

    async function changeRole(role:string, id:string) {

        console.log("role change");

        let token = await localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/users/" + id + "?role=" + role, {
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
        if ("user" in result){
            console.log(result.user);
        }

    }
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
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
                    <IonRow></IonRow>
                    <IonRow id='add-admin-row2'>
                        <IonCol>
                            <IonItemDivider id='search-div'>
                            <IonSearchbar placeholder='Search for User by Email' id='searchBar' onIonChange={e => setSearchText(e.detail.value!)} animated={true}></IonSearchbar>
                                {console.log(searchText)}
                            </IonItemDivider>                   
                        </IonCol>
                    </IonRow>
                    <IonRow id='add-admin-row3'>
                        <IonCol>
                            <IonList>
                            {users.map((user: User, index:number) => (
                                <IonItem key={user.id} class="user-result-item">
                                    <IonRow id='user-result-div-one'>
                                        <IonCol>{user.email}</IonCol>
                                        <IonCol>
                                            <IonChip>
                                                <IonLabel>{user.role}</IonLabel>
                                            </IonChip>
                                        </IonCol>  
                                    </IonRow>
                                    <IonRow id='user-result-div-two'>
                                        <IonCol>
                                        <IonButton onClick={ () => changeRole("admin",user.id) } id='make-admin-btn' fill='solid'>Make Admin</IonButton>
                                            <IonButton onClick={ () => changeRole("user",user.id) } id='make-user-btn' fill='solid'>Make User</IonButton> 
                                        </IonCol>
                                    </IonRow>
                                </IonItem>
                            ))}
                            </IonList>
                        </IonCol>                    
                    </IonRow>
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

export default AddAdmin;
