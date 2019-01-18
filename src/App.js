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
import SavedArts from './SavedArts'



class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    zip: '',
    id: 0
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


   handleZip = (position) => {
	let params = {
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		username: 'demo'
    }

	fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${params.lat}&lng=${params.lng}&username=omgitsgod`).then(r => r.json()).then(x => this.setState({zip: x.postalCodes[0].postalCode}))

}

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(this.handleZip)
    if (this.state.user.user) {
    this.setState({
      id: this.state.user.user.id
    })}
  }
  render() {
    return (

      <div className="App">
        <MenuAppBar logged={this.state.logged} handleUser={this.handleUser}/>
        {(this.state.logged) ?
      <div>
      <Route exact path="/" component={Splash} />
      <Route path="/news" component={HeadlinesContainer} />
      <Route path="/news" render={(props)=><HeadlinesContainer {...props} user={this.state.user} id={this.state.id} handleUser={this.handleUser}/>}/>
      <Route path="/savedarts" component={SavedArts} />
      <Route path="/savedarts" render={(props)=><SavedArts {...props} user={this.state.user} handleUser={this.handleUser}/>}/>
      <Route path="/chat" component={Chat} />
      <Route path="/splash" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} zip={this.state.zip}/>}/>
      <Route path="/signin" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} zip={this.state.zip}/>}/>
        <Route path="/signup" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} zip={this.state.zip}/>}/>
      </div>
      :
      <div>
      <Route exact path="/" component={HeadlinesContainer} />

      <Route path="/signin" render={(props)=><SignIn {...props} handleUser={this.handleUser}/>}/>
      <Route path="/signup" render={(props)=><SignUp {...props} handleUser={this.handleUser}/>}/>
      </div>
    }
      </div>



    );
  }
}

export default App;
