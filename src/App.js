import React, { Component } from 'react';
import './App.css';
import  HeadlinesContainer from './HeadlinesContainer'
import MenuAppBar from './Topbar'
import { Route  } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Chat from './Chat'
import Splash from './Splash'
import SavedArts from './SavedArts'
import { HEADERS, API_WS_ROOT } from './constants'
import { ActionCableProvider } from 'react-actioncable-provider';
import ThePeople from './ThePeople'



class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    zip: '',
    id: 0,
    address: ''
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

	//fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${params.lat}&lng=${params.lng}&username=omgitsgod`).then(r => r.json()).then(x => this.setState({zip: x.postalCodes[0].postalCode}))
  const lat = position.coords.latitude
  const long = position.coords.longitude
  const url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${lat}%2C${long}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&${process.env.REACT_APP_IDCODE_API_KEY}`
  fetch(url).then(r=>r.json()).then(x => this.setState({
    zip: x.Response.View[0].Result[0].Location.Address.PostalCode,
    address: (x.Response.View[0].Result[0].Location.Address.HouseNumber + "%20" + x.Response.View[0].Result[0].Location.Address.Street + "%20" + x.Response.View[0].Result[0].Location.Address.PostalCode).split(" ").join('%20')
  }))
}

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(this.handleZip)
    if (this.state.user.user) {
    this.setState({
      id: this.state.user.user.id
    })}


  }
  render() {
    console.log(this.state.address)
    return (

      <div className="App">
        <MenuAppBar logged={this.state.logged} handleUser={this.handleUser}/>
        {(this.state.logged) ?
      <ActionCableProvider url={API_WS_ROOT + this.state.user.jwt}>
      <Route exact path="/" component={Splash} />
      <Route path="/people" render={(props)=><ThePeople {...props} user={this.state.user} handleUser={this.handleUser} address={this.state.address} zip={this.state.zip}/>}/>
      <Route path="/news" render={(props)=><HeadlinesContainer {...props} user={this.state.user} id={this.state.id} handleUser={this.handleUser}/>}/>
      <Route path="/savedarts" render={(props)=><SavedArts {...props} user={this.state.user} handleUser={this.handleUser}/>}/>
      <Route path="/chat" render={(props)=><Chat {...props} user={this.state.user} handleUser={this.handleUser}/>}/>

      <Route path="/splash" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} address={this.state.address} zip={this.state.zip}/>}/>
      <Route path="/signin" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} address={this.state.address} zip={this.state.zip}/>}/>
        <Route path="/signup" render={(props)=><Splash {...props} user={this.state.user} handleUser={this.handleUser} address={this.state.address} zip={this.state.zip}/>}/>
      </ActionCableProvider>
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
