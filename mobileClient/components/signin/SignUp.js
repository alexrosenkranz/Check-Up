import React, {Component} from 'react'
import {View, StyleSheet, Navigator, ScrollView } from 'react-native'
import moment from 'moment'
import { Container, Content, Header, Body, Item, Input, Label, Picker, Button, Text, Left, Title, Right, Icon, H1, H2, H3 } from 'native-base'
import Expo, {Constants} from 'expo';
import Main from '../Main'
import {_signUp} from '../../lib/apiService'

const t = require('tcomb-form-native')
const templates = require('tcomb-form-native/lib/templates/bootstrap')

const Form = t.form.Form
t.form.Form.templates = templates;


const signUp = t.struct({
  first_name: t.String,
  last_name: t.String,
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
      values: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  }

  _signUpButton = () => {
    _signUp(this.state.value).then((user) => {
      console.log(user)
      
      if (!user.code) {
        this.props.navigator.push({
          name: 'SignIn',
          userInfo: user
        })
      } else {
        alert('This email is already in use!')
      }
    })
  }

  _onChange = (value) => {
    this.setState({value})
  }

  render() {
    
    return (
      <Container style={{paddingTop: Constants.statusBarHeight}}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigator.pop()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Sign Up!</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Text>Enter your information below and let's get started!{'\n'}</Text>
          <Form
              ref='form'
              type={signUp}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />

          <Text></Text>
          
          <Button dark block onPress={this._signUpButton}>
            <Text>Sign Up</Text>
          </Button>


        </Content>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
}

