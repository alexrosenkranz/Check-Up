import React from 'react'
import { Platform, StyleSheet, Text, View, Navigator } from 'react-native'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signin/SignUp'
import Main from './components/Main'
import SideBar from './components/Sidebar';
import {
  StackNavigator,
} from 'react-navigation'
import { Drawer } from 'native-base'
import Expo, {Constants, Components} from 'expo'



export default class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isReady: false,
      isLoggedIn: false
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

_closeDrawer = () => {
  this
    .drawer
    ._root
    .close()
};

_openDrawer = () => {
  console.log('open')
  this
    .refs
    .drawer
    .open()
};



 _navigate = (route) => {
    this.refs.navigator.push(route);
    this.refs.drawer.close();
}
  // PUT SOMETHING IN HERE TO ROUTE NAVIGATOR TO DASHBOARD IF LOGGED IN 

  render () {
if (!this.state.isReady) {
  return <Expo.AppLoading/>;
}
    
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar _navigate={this._navigate} _openDrawer={this._openDrawer}/>}
        onClose={() => this._closeDrawer()}>
       <Navigator ref='navigator'
       _openDrawer= {this._openDrawer}
        initialRoute={{
          name: 'SignIn'
        }}
        renderScene={this.renderScene}
        />
      </Drawer>
    );
  }
}

