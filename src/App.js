import React, { useState, useEffect } from 'react';
import './App.css';
import { Route  } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import ArticleContainer from './ArticleContainer';
import PoliticianContainer from './PoliticianContainer';
import BillContainer from './BillContainer';
import VoteContainer from './VoteContainer';
import EventContainer from './EventContainer';
import PoliticianSearch from './PoliticianSearch';
import TopBar from './Topbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import SavedArts from './SavedArts';
import ww2_and_wash_mount from './ww2_and_wash_mount.mp4';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState(0);

  const handleUser = (user) => {

    if (user.user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser({});
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    
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
              <Route exact path='/events' component={EventContainer} />
              <Route exact path='/search' component={PoliticianSearch} />
              <Route path='/people' render={(props)=><PoliticianContainer {...props} user={user} handleUser={handleUser} />} />
              <Route path='/news' render={(props)=><ArticleContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/savedarts' render={(props)=><SavedArts {...props} user={user} handleUser={handleUser}/>}/>
              <Route path='/chat' render={(props)=><Chat {...props} user={user} handleUser={handleUser}/>}/>
              <Route  path='/bills' component={BillContainer} />
              <Route  path='/votes' component={VoteContainer} />
              <Route exact path='/' render={(props)=><ArticleContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/signin' render={(props)=><ArticleContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
              <Route path='/signup' render={(props)=><ArticleContainer {...props} user={user} id={id} handleUser={handleUser}/>}/>
            </ActionCableProvider>
          :
            <>
              <Route exact path='/events' component={EventContainer} />
              <Route exact path='/bills' component={BillContainer} />
              <Route exact path='/votes' component={VoteContainer} />
              <Route exact path='/' component={ArticleContainer} />
              <Route exact path='/search' component={PoliticianSearch} />
              <Route path='/people' render={(props)=><PoliticianContainer {...props} user={user} handleUser={handleUser}/>}/>
              <Route path='/signin' render={(props)=><SignIn {...props} handleUser={handleUser}/>}/>
              <Route path='/signup' render={(props)=><SignUp {...props} handleUser={handleUser}/>}/>
            </>
          }
      </div>
  );
}

export default App;
