import React, {Component} from 'react'
import {View, StyleSheet, Navigator, ScrollView, DatePickerAndroid, DatePickerIOS } from 'react-native'
import moment from 'moment'
import { Container, Content, Header, Body, Item, Input, Label, Picker, Button, Text, Left, Title, Right, Icon, H1, H2, H3 } from 'native-base'
import Expo, {Constants} from 'expo';
import Main from '../Main'
import {_signUp} from '../../lib/apiService'


const t = require('tcomb-form-native')
const templates = require('tcomb-form-native/lib/templates/bootstrap')


const Form = t.form.Form
t.form.Form.templates = templates;


const addAppt = t.struct({
  appTime: t.Date,
  provider: t.String,
  notes: t.maybe(t.String)
})

const options = {
  fields: {
    notes: {
      autoCapitalize: 'none',
      autoCorrect: false,
    },
    appTime: {
      mode: 'time'
    }
  }
}


export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        appTime: '',
        provider: '',
        notes: '',
      },
      userInfo: '',
      isLoading: true
    }
  }

  componentDidMount() {
    const userInfo = this.props.userInfo
    this.setState({userInfo: userInfo, isLoading: false})
  }

   _navigate = (route) => {
    this.props.navigator.push({
      name: `${route}`,
      userInfo: this.state.userInfo
    })
  }

   _onChange = (value) => {
    this.setState({value})
  }

  render() {

    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    
    return (
      <Container style={{paddingTop: Constants.statusBarHeight}}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigator.pop()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{flex: 3}}>Add an Appointment</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Text>Enter your information below and let's get started!{'\n'}</Text>
          <Form
              ref='form'
              type={addAppt}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />

          <Text></Text>
          
          <Button dark block onPress={this._signUpButton}>
            <Text>Sign Up</Text>
          </Button>


        </Content>
        <Footer style={styles.footer}>
        
      <Button style={{flex: 1, flexDirection: 'column'}} transparent onPress={() => this._navigate('ApptHome')}>
          <Icon name='md-calendar'/>
          <Text>Appointments</Text>
        </Button>      
        
        <Button style={{flex: 1, flexDirection: 'column'}} transparent onPress={() => this._navigate('Providers')}>
          <Icon name='ios-medical'/>
          <Text>Providers</Text>
        </Button>        
        
        <Button style={{flex: 1, flexDirection: 'column'}} transparent onPress={() => this._navigate('UserProfile')}>
          <Icon name='md-body'/>
          <Text>User Info</Text>
        </Button> 
        </Footer>
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

