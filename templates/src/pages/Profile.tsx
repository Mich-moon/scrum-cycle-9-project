import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonText, IonItemDivider, IonPage, IonRow, IonAvatar, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import Header from '../components/userHeader';
import AdminHeader from '../components/adminHeader';
import './Profile.css';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    photo: string;
    role: string;
    created_at: string;
}

const Profile: React.FC<User> = (props:User) => {

    const [isAdmin, setRole] = useState<string | null>('false');

    useIonViewWillEnter(() => {

        getClaims();

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

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    {isAdmin == "false" && <Header />}
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

                <IonGrid className='ion-margin' id='profile-grid'>
                    <IonRow></IonRow>
                    <IonRow id='profile-row2'>
                        
                        <IonCol id='profile-col2'>
                        {/* <IonTitle className='ion-padding-bottom' id='profile-title-right'>Signup</IonTitle>*/}
                        <IonAvatar class= "center">
                                <img id='profile-img'   src={process.env.PUBLIC_URL + '/assets/images/signup_image.png'} alt='profile photo'/>
                        </IonAvatar>
                        <IonItemDivider id='field'>
                                <IonLabel color="light">Firstname:</IonLabel>
                                <IonText> { props.first_name } </IonText>
                            </IonItemDivider>
                            <IonItemDivider id='field'>
                                <IonLabel color="light">Lastname:</IonLabel>
                                <IonText> { props.last_name } </IonText>
                            </IonItemDivider>
                            <IonItemDivider id='field'>
                                <IonLabel color="light">Email:</IonLabel>
                                <IonText> {props.email} </IonText>
                            </IonItemDivider>
                            <IonItemDivider id='field'>
                                <IonLabel color="light">Password:</IonLabel>
                                <IonText>Password</IonText>
                            </IonItemDivider> 
                            <IonItemDivider id="edit-btn-div">
                                <IonButton id='profile-btn2' fill='outline' color={'white'} href="./updateProfile">Delete</IonButton>
                                <IonButton id='profile-btn' fill='solid' href="./updateProfile">Edit</IonButton>
                            </IonItemDivider>
                        </IonCol> 
                    </IonRow> 
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
