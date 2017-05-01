import React, { Component } from 'react'
import { View, StyleSheet, Navigator } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, H1, H2, H3} from 'native-base'
import { Constants } from 'expo'; 
import Main from '../Main'
import {_getUser} from '../../lib/apiService'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      userInfo: ""
    }
  }

  componentDidMount = () => {
    let userInfo = this.props.userInfo
    
    let userEmail = userInfo ? userInfo.email : 'Alex.rosenkranz@gmail.com'    
    _getUser(userEmail).then((user) => {
      this.setState({userInfo: user[0]})
    })
  }


  _signInButton = () => {
    this.props.navigator.push({
		  name: 'Dashboard',
      userInfo: this.state.userInfo
		})
  }

  _signUp = () => {
    this.props.navigator.push({
      name: 'SignUp'
    })
  }


  render() {
    return (
      <Container style={styles.container}>
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
            <Text onPress={this._signUp}>Not a user? Sign up here.{'\n'}</Text>
        </View>
      </Container>
    )
  }
}

const styles = {
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
}

