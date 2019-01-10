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
        <MenuAppBar/>

      <Route path="/news" component={HeadlinesContainer} />
      <Route path="/chat" component={Chat} />

      <Route path="/signin" render={(props)=><SignIn {...props} handleUser={this.handleUser}/>}/>
      <Route path="/signup" component={SignUp} />
      </div>



    );
  }
}

export default App;
