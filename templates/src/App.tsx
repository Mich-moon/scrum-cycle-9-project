import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import ViewEvent from './pages/ViewEvent';
import Main from './pages/Main';
import Profile from './pages/Profile';
import AddAdmin from './pages/AddAdmin';
import ViewUser from './pages/ViewUser';
import UpdateProfile from './pages/UpdateProfile';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* context api */
import { SigninContext } from './contexts/SigninContext'


setupIonicReact();


interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
  role: string;
  created_at: string;
}

const App: React.FC = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    useIonViewWillEnter(() => {
      getUser();

      async function getUser() {
        // get token from capacitor storage
        //const jwt_value  = await Storage.get({ key: 'jwt' });
        //const token = jwt_value;
        //console.log(jwt_value);

        let token = localStorage.getItem("jwt");
        let user_id = localStorage.getItem("user_id");

        const result = await fetch("http://localhost:8080/api/v2/events/users/" + user_id, {
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

        if ("user" in result) {
            setUser(result.user);
        }
      }
    }, [])

    return (
      <IonApp>
        <SigninContext.Provider
        value={{ loggedIn, setLoggedIn }}
        >

        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path='/home'>
              <Home />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/signup'>
                <Signup />
            </Route>
            <Route exact path='/login'>
                <Login />
            </Route>
            <Route exact path='/createEvent'>
                <CreateEvent />
            </Route>
            <Route exact path='/updateEvent'>
                <UpdateEvent />
            </Route>
            <Route exact path='/viewEvent'>
                <ViewEvent />
            </Route>
            <Route exact path='/main'>
                <Main />
            </Route>
            <Route exact path='/profile'>
                <Profile/>
            </Route> 
            <Route exact path='/updateProfile'>
                <UpdateProfile />
            </Route>
            <Route exact path='/addAdmin'>
                <AddAdmin />
            </Route>
            <Route exact path='/ViewUser'>
                <ViewUser />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
        </SigninContext.Provider>
      </IonApp>
      
    );
};

export default App;
