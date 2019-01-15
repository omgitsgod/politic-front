import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  HeadlinesContainer from './HeadlinesContainer'
import MenuAppBar from './Topbar'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import MediaCard from './MediaCard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Chat from './Chat'
import Splash from './Splash'



class App extends Component {
  state = {
    loggedIn: false,
    user: {},
  }

  handleUser = (user) => {
    if (user.user) {
      this.setState({
        user: user,
        logged: true
      })
    } else {
      this.setState({
        user: {},
        logged: false
      })
    }
    console.log(user)
  }
  render() {

    return (

      <div className="App">
        <MenuAppBar logged={this.state.logged} handleUser={this.handleUser}/>
        {(this.state.logged) ?
      <div>
      <Route exact path="/" component={Splash} />
      <Route path="/news" component={HeadlinesContainer} />
      <Route path="/chat" component={Chat} />
      <Route path="/splash" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser}/>}/>
      <Route path="/signin" render={(props)=><HeadlinesContainer {...props} user={this.state.user} handleUser={this.handleUser}/>}/>
        <Route path="/signup" render={(props)=><HeadlinesContainer {...props} user={this.state.user} handleUser={this.handleUser}/>}/>
      </div>
      :
      <div>
      <Route exact path="/" component={Splash} />

      <Route path="/signin" render={(props)=><SignIn {...props} handleUser={this.handleUser}/>}/>
      <Route path="/signup" render={(props)=><SignUp {...props} handleUser={this.handleUser}/>}/>
      </div>
    }
      </div>



    );
  }
}

export default App;
