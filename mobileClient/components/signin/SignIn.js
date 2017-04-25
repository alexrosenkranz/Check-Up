import React, { Component } from 'react'
import { View, StyleSheet, Navigator } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, H1, H2, H3} from 'native-base'
import { Constants } from 'expo'; 
import Main from '../Main'

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }

  _signInButton = () => {

    this.props.navigator.push({
		  name: 'Dashboard'
		})
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <H1>Check Up!</H1>
          <Text>{'\n'}</Text>
      
            <Item bordered>
              <Input placeholder='Email' onChangeText={(email) => this.setState({email: email})} />
            </Item>
            <Item bordered>
              <Input secureTextEntry={true} placeholder='Password' onChangeText={(password) => this.setState({password: password})} />
            </Item>
            <Text></Text>
            <Button dark block onPress={this._signInButton}>
              <Text>Sign In</Text>
            </Button>
          
            <Text>{'\n'}Forgot your login?{'\n'}</Text>
            <Text>Not a user? Sign up here.{'\n'}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  }, 
  inner: {
    width: 90 + '%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

