import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import SignIn from './components/signin/SignIn'
import Main from './components/Main'
import {
  StackNavigator,
} from 'react-navigation';


export default class App extends React.Component {
  renderScene = (route, navigator) => {
   if(route.name == 'SignIn') {
     return <SignIn navigator={navigator} />
   }
   if(route.name == 'Dashboard') {
     return <Main navigator={navigator} />
   }
  }
 
  // PUT SOMETHING IN HERE TO ROUTE NAVIGATOR TO DASHBOARD IF LOGGED IN 

  // async componentWillMount() {
  //     await Expo.Font.loadAsync({
  //       'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
  //     });
  render () {
    
    
    return (
       <Navigator
        initialRoute={{
          name: 'SignIn'
        }}
        renderScene={this.renderScene}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
