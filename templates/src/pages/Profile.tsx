import { Storage } from '@capacitor/storage';
import { useState } from 'react';
import { close } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar, IonToast, useIonRouter, useIonViewWillEnter  } from '@ionic/react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import UserHeader from '../components/userHeader';
import './Profile.css';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    photo: string;
    role: string;
    created_at: string;
}

const Profile: React.FC = () => {
    const router = useIonRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isAdmin, setRole] = useState<String | null>('false');
    //const [user_id, setID] = useState<String | null>('false');
    const [first_name, setfname] = useState();
    const [last_name, setlname] = useState();
    const [email, setemail] = useState();
    const [role, setrole] = useState();
    const [photo, setphoto] = useState();


    useIonViewWillEnter(() => {
        getClaims();
        getprofile();
        //deltprofile();

        async function getClaims() {
            // get role from capacitor storage
            //const user_is_admin_value = await Storage.get({ key: 'user_is_admin' });
            //const user_is_admin = user_is_admin_value;
            //console.log( user_is_admin );

            let user_is_admin = localStorage.getItem("user_is_admin");
            setRole(user_is_admin);
            //console.log(user_is_admin);

            //let user_id = localStorage.getItem("user_id");
            //setID(user_id);
            //console.log(user_id);
        }

    }, [])

    async function getprofile() {
        let jwt = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/users/" + user_id, {
            method: "get",
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
        if ("user" in result) {
            console.log(result.user);
            setfname(result.user.first_name);
            setlname(result.user.last_name);
            setemail(result.user.email);
            setrole(result.user.role);
            setphoto(result.user.photo);
        }
    }

    async function deltprofile() {
        let jwt = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");
        const result = await fetch("http://localhost:8080/api/v2/users/" + user_id, {
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

        if (result.user) {
            router.push("/main", "forward", "push");
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
            
            <IonGrid className='ion-margin' id='profile-grid'>
                <IonRow></IonRow>
                <IonRow id='profile-row2'>
                    <IonCol id='profile-col2'>
                       {/* <IonTitle className='ion-padding-bottom' id='profile-title-right'>Signup</IonTitle>*/}
                       <IonAvatar class= "center">
                            <img id='profile-img'   src={'http://localhost:8080/api/v2/uploads/'+photo} alt='profile photo'/>
                       </IonAvatar>
                       <IonItemDivider id='field'>
                            <IonLabel color="light">Firstname:</IonLabel>
                            <IonText>{first_name}</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Lastname:</IonLabel>
                            <IonText> {last_name}</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Email:</IonLabel>
                            <IonText>{email}</IonText>
                        </IonItemDivider>
                        <IonItemDivider id='field'>
                            <IonLabel color="light" id="label">Role:</IonLabel>
                            <IonText>{role}</IonText>
                        </IonItemDivider>
                        <IonItemDivider id="edit-btn-div">
                             <IonButton onClick={deltprofile}  id='profile-btn2' fill='outline' color={'white'}>Delete</IonButton>
                             <IonButton id='profile-btn' fill='solid' href="./updateProfile" >Edit</IonButton>
                        </IonItemDivider>   
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

export default Profile;
