import React, { Component } from 'react'
import {AsyncStorage, View, StyleSheet, Navigator, Image } from 'react-native'
import { Container, Content, Button, Text, H1, H2, H3} from 'native-base'
import { Constants } from 'expo'; 
import Main from '../Main'
import {_signIn, _getPatient} from '../../lib/apiService'

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
      autoCorrect: false,
      error: 'Please enter a correct email.'
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      secureTextEntry: true,
      autoCorrect: false,
      error: 'Please enter a correct password.'
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
        if (!token) {
          this.setState({
            isLoading: false
          })
        } else {
          _getPatient(token).then((result) => {
            this.props.navigator.push({
              name: 'Dashboard'
            })
          })
        }
      })
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
      if (responseData.token) {
        this._onValueChange('access_token', responseData.token).then(() => {
        this.props.navigator.push({
        name: 'Dashboard'
      })
    })
      } else {
        return alert(responseData.msg)
      }
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
      <Image source={require('../../images/bg.png')} style={styles.container}>
        <Content padder style={styles.inner}>
        
          <H1 style={styles.centered}>Check Up!</H1>
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
          
            <Text style={styles.centered} onPress={this._signUp}>{'\n'}Not a user? Sign up here.{'\n'}</Text>
        </Content>
      </Image>
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
    backgroundColor: '#fff',
  }, 
  inner: {
    width: 95 + '%',
    flex: 1,
    overflow: 'visible',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  centered: {
    textAlign: 'center'
  }
}

