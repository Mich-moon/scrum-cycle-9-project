import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItemDivider, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/header';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
        <IonHeader class='ion-no-border'>
            <IonToolbar>
                <Header />
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen class='ion-justify-content-center'>
        {/*   <IonHeader collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'>Blank2</IonTitle>
                </IonToolbar>
            </IonHeader> */}

            <IonGrid class='ion-margin' id='home-grid'>
                <IonRow></IonRow>
                <IonRow>
                    <IonCol id='home-col1'>
                        <IonText id='home-txt1'>
                            EVENTS MANAGEMENT SYSTEM <br></br>
                        </IonText>
                        <IonText id='home-txt2'>
                            by Team Synergy<br></br><br></br><br></br>
                        </IonText>
                        <IonText id='home-txt3'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                recusandae alias error harum maxime adipisci amet laborum. 
                        </IonText>                                           
                    </IonCol>
                    <IonCol id='home-col2'>
                        <IonImg src={process.env.PUBLIC_URL + '/assets/images/home_image.png'} />
                    </IonCol>
                </IonRow>
                <IonRow></IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Home;
