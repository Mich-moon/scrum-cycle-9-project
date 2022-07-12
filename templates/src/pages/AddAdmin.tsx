import { IonButton, IonCol, IonContent, IonSearchbar, IonGrid, IonHeader, IonDatetime, IonLabel, IonInput, IonItemDivider, IonPage, IonRow, IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonTitle, IonToolbar, IonSlides, IonSlide, IonSelect, IonSelectOption, IonText, IonList, IonItem } from '@ionic/react';
import { useState } from 'react';
import AdminHeader from '../components/adminHeader';
import './AddAdmin.css';

const AddAdmin: React.FC = () => {
    const [searchText, setSearchText] = useState('');
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
                                <IonSearchbar placeholder='Search for User by Email' value={searchText} id='searchBar' onIonChange={e => setSearchText(e.detail.value!)} animated={true}></IonSearchbar>
                                {console.log(searchText)}
                            </IonItemDivider>                   
                        </IonCol>
                    </IonRow>
                    <IonRow id='add-admin-row3'>
                        <IonCol>
                            <IonList>
                                <IonItem href='/ViewUser'>
                                    1
                                </IonItem>
                                <IonItem href='/ViewUser'>
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

export default AddAdmin;
