import React, {Component} from 'react'
import {AsyncStorage, View, StyleSheet, Navigator, ScrollView, DatePickerAndroid, DatePickerIOS } from 'react-native'
import moment from 'moment'
import { Container, Content, Header, Footer, FooterTab, Body, Item, Input, Label, Button, Text, Left, Title, Right, Icon, H1, H2, H3 } from 'native-base'
import Expo, {Constants} from 'expo'
import Main from '../Main'
import {_addAppointment} from '../../lib/apiService'


const t = require('tcomb-form-native')
const templates = require('tcomb-form-native/lib/templates/bootstrap')


const Form = t.form.Form
t.form.Form.templates = templates;

let providerList = {}

const Providers = t.enums(providerList)

const addAppt = t.struct({
  appTime: t.Date,
  provider: Providers,
  notes: t.String
})

const options = {
  fields: {
    appTime: {
      label: 'Appointment Date & Time',
      config: {
        format: (date) => {
          return moment(date).format("dddd, MMMM Do YYYY, h:mm a")
        }
      },
    },
    notes: {
      autoCapitalize: 'none',
      autoCorrect: false,
    }
  }
}

export default class SignIn extends React.Component {

  static defaultProps = {
    date: new Date(),
  };

  constructor(props) {
    super(props)
    this.state = {
      value: {
        appTime: this.props.date,
        provider: '',
        notes: ''
      },
      userInfo: '',
      isLoading: true
    }
  }

  componentDidMount() {
    const userInfo = this.props.userInfo
    userInfo.providers.map((provider) => {
      providerList[provider._id] = provider.name
    })
    this.setState({userInfo: userInfo, isLoading: false})
  }

   _navigate = (route) => {
    this.props.navigator.push({
      name: `${route}`,
      userInfo: this.state.userInfo
    })
  }

   _addAppointment = () => {
     AsyncStorage.getItem('access_token').then((token) => {
      
      _addAppointment(this.state.value, token)
        .then(() => {
          this.props.navigator.push({
            name: 'ApptHome',
            userInfo: this.state.userInfo
          })
        })
      })
    }
  

  onDateChange = (date) => {
    this.setState({appTime: date});
  };


   _onChange = (value) => {
    this.setState({value})
  }

  render() {
    console.log(this.state.userInfo.providers)
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>
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
          
          <Button dark block onPress={this._addAppointment}>
            <Text>Sign Up</Text>
          </Button>


        </Content>
        <Footer style={styles.footer}>
        <FooterTab>
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
        </FooterTab>
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
  footer: {
    height: 10 + '%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

