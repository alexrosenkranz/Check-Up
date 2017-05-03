import React from 'react'
import { Component, PropTypes, Platform, StyleSheet, Text, View, Navigator, StatusBar } from 'react-native'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signin/SignUp'
import AddAppt from './components/appointments/AddAppt'
import SingleAppt from './components/appointments/SingleAppt'
import ApptHome from './components/appointments/AppointmentsHome'
import Providers from './components/providers/Providers'
import AddProvider from './components/providers/AddProvider'
import UserProfile from './components/user/UserProfile'
import Vitals from './components/user/Vitals'
import Medication from './components/user/Medication'
import Main from './components/Main'
import SideBar from './components/Sidebar';
import {
  StackNavigator,
} from 'react-navigation'
import Expo, {Constants, Components} from 'expo'



export default class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isReady: false,
      isLoggedIn: false,

    }
  }
  renderScene = (route, navigator, passProps) => {
    if(route.name == 'SignIn') {
      return <SignIn refs={this.refs} navigator={navigator} />
    }
    if(route.name == 'Dashboard') {
      return <Main refs={this.refs} navigator={navigator} userInfo={route.userInfo}/>
    }
    if (route.name == 'SignUp') {
      return <SignUp refs={this.refs} navigator={navigator}  />
    }
    if (route.name == 'AddAppt') {
      return <AddAppt refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'ApptHome') {
      return <ApptHome refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'SingleAppt') {
      return <SingleAppt refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'Providers') {
      return <Providers refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'SingleProvider') {
      return <SingleProvider refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'AddProvider') {
      return <AddProvider refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'UserProfile') {
      return <UserProfile refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'Vitals') {
      return <Vitals refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
    if (route.name == 'Medication') {
      return <Medication refs={this.refs} navigator={navigator} userInfo={route.userInfo} />
    }
  }
async componentWillMount() {
  if (Platform.OS === 'android') {
    await Expo
      .Font
      .loadAsync({'Roboto': require('native-base/Fonts/Roboto.ttf'), 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')});

    this.setState({isReady: true});
  }
  this.setState({isReady: true})
}


  // PUT SOMETHING IN HERE TO ROUTE NAVIGATOR TO DASHBOARD IF LOGGED IN 

  render () {
if (!this.state.isReady) {
  return <Expo.AppLoading/>;
}
    
    return (
       <Navigator ref='navigator'
        initialRoute={{
          name: 'SignIn'
        }}
        renderScene={this.renderScene}
        />
    );
  }
}

