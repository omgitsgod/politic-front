import React, { useState, useEffect } from 'react';
import './App.css';
import { Route  } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import  HeadlinesContainer from './HeadlinesContainer';
import TopBar from './Topbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import SavedArts from './SavedArts';
import ThePeople from './ThePeople';
import Bills from './Bills';
import Votes from './Votes';
import Events from './Events';
import ww2_and_wash_mount from './ww2_and_wash_mount.mp4';




function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [zip, setZip] = useState('');
  const [id, setId] = useState(0);
  const [address, setAddress] = useState('');

  const handleUser = (user) => {

    if (user.user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser({});
      setLoggedIn(false);
    }
  }

  const handleZip = async (position) => {

    const { latitude, longitude } = position.coords;
    const json = await fetch(`${process.env.REACT_APP_BACK_HOST}/zip/${latitude}/${longitude}`).then(r => r.json());
    const location = json.Response.View[0].Result[0].Location.Address;
    const addy = `${location.HouseNumber}%20${location.Street}%20${location.PostalCode}`.split(' ').join('%20');

    setZip(location.PostalCode);
    setAddress(addy);
  }

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(handleZip)
    
    if (user.user) {
    setId(user.user.id)
    }
  }, [user]);

  return (
      <div className='App'>
        <video className='myVideo' loop autoPlay muted>
          <source src={ww2_and_wash_mount} type='video/mp4' />
          <source src={ww2_and_wash_mount} type='video/ogg' />
          Your browser does not support the video tag.
        </video>
        <TopBar logged={loggedIn} handleUser={handleUser}/>
          {(loggedIn) ?
            <ActionCableProvider url={`${process.env.REACT_APP_API_WS_ROOT}${user.jwt}`}>
              <Route exact path='/events' component={Events} />
              <Route path='/people' render={(props)=><ThePeople {...props} user={user} handleUser={handleUser} address={address} zip={zip}/>}/>
              <Route path='/news' render={(props)=><HeadlinesContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/savedarts' render={(props)=><SavedArts {...props} user={user} handleUser={handleUser}/>}/>
              <Route path='/chat' render={(props)=><Chat {...props} user={user} handleUser={handleUser}/>}/>
              <Route  path='/bills' component={Bills} />
              <Route  path='/votes' component={Votes} />
              <Route exact path='/' render={(props)=><HeadlinesContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/signin' render={(props)=><HeadlinesContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/signup' render={(props)=><HeadlinesContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
            </ActionCableProvider>
          :
            <div>
              <Route exact path='/events' component={Events} />
              <Route exact path='/bills' component={Bills} />
              <Route exact path='/votes' component={Votes} />
              <Route exact path='/' component={HeadlinesContainer} />
              <Route path='/signin' render={(props)=><SignIn {...props} handleUser={handleUser}/>}/>
              <Route path='/signup' render={(props)=><SignUp {...props} handleUser={handleUser}/>}/>
            </div>
          }
      </div>
  );
}

export default App;
