import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import SignIn from './components/signin/SignIn'

export default class App extends React.Component {
  // async componentWillMount() {
  //     await Expo.Font.loadAsync({
  //       'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
  //     });
  render() {
    return (
      <SignIn/>
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
