import React, { Component } from 'react'
import {AsyncStorage, View, StyleSheet, Navigator } from 'react-native'
import { Container, Content, Button, Text, H1, H2, H3} from 'native-base'
import { Constants } from 'expo'; 
import Main from '../Main'
import {_signIn} from '../../lib/apiService'

const t = require('tcomb-form-native')
const templates = require('tcomb-form-native/lib/templates/bootstrap')


const Form = t.form.Form
t.form.Form.templates = templates;


const signIn = t.struct({
  email: t.String,
  password:  t.String
})

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false
    }
  }
}


export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: '',
        password: ''
      }    
    }

    this._onValueChange= this._onValueChange.bind(this)
  }


  componentWillMount() {
      AsyncStorage.getItem('access_token').then((token) => {
        console.log(token)
        this.setState({
          isLoading: false
        });
      });
    }


   async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _signInButton = () => {
    
    _signIn(this.state.value.email, this.state.value.password)
    .then((responseData) => {
      this._onValueChange('access_token', responseData.token)
    }).then(() => {
        this.props.navigator.push({
        name: 'Dashboard'
      })
    })
    .catch((err) => {alert(err)})
    .done()
  }

  _signUp = () => {
    this.props.navigator.push({
      name: 'SignUp'
    })
  }

  _onChange = (value) => {
    this.setState({value})
  }


  render() {
    
    return (
      <Container style={styles.container}>
        <Content padder style={styles.inner}>
        
          <H1 style={{textAlign: 'center'}}>Check Up!</H1>
          <Text>{'\n'}</Text>
      
            <Form
              ref='form'
              type={signIn}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />
            <Text></Text>
            <Button dark block onPress={this._signInButton}>
              <Text>Sign In</Text>
            </Button>
          
            <Text>{'\n'}Forgot your login?{'\n'}</Text>
            <Text onPress={this._signUp}>Not a user? Sign up here.{'\n'}</Text>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  }, 
  inner: {
    width: 95 + '%',
  }
}

