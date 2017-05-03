import React, {Component} from 'react'
import { AsyncStorage, View, StyleSheet, Navigator, ScrollView } from 'react-native'
import moment from 'moment'
import { Container,Content, Header, Body, Footer, Item, Input,  Label, Picker, Button, Text,Left, Title, Right, Icon, H1, H2, H3 } from 'native-base'
import Expo, {Constants} from 'expo';
import Main from '../Main'
import {_addProvider} from '../../lib/apiService'


const t = require('tcomb-form-native')
const templates = require('tcomb-form-native/lib/templates/bootstrap')


const Form = t.form.Form
t.form.Form.templates = templates;


const addProvider = t.struct({
  name: t.String,
  phone: t.String,
  address: t.String,
  specialty:  t.String
})

const options = {
  fields: {
    name: {
      label: 'Doctor/Lab Name',
      autoCapitalize: 'words',
      autoCorrect: false,
    },
    phone: {
      label: 'Phone Number',
      keyboardType: 'phone-pad',
      help: '123-456-7890 Format'
    },
    address: {
      multiline: true,
      numberOfLines: 4,
      help: 'Street, City, State, ZIP',
    },
    specialty: {
      multiline: true,
      numberOfLines: 4,
      height: 50
    }
  }
}





export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        name: '',
        phone: '',
        address: '',
        specialty: ''
      },
      userInfo: '',
      isLoading: true
    }
  }

componentDidMount = () => {
  let userInfo = this.props.userInfo
  if (userInfo) { 
    this.setState({userInfo})
  }
}

  _navigate = (route) => {
    this.props.navigator.push({
      name: `${route}`,
      userInfo: this.state.userInfo
    })
  }

   _addProviderButton = () => {

     AsyncStorage.getItem('access_token').then((token) => {
      
      _addProvider(token, this.state.value)
        .then((result) => {
          console.log(result)
        })
      })
    }
  

  _onChange = (value) => {
    this.setState({value})
  }

  render() {
    
    const nativeItem= Picker.Item

    if(!this.state.userInfo) {
      return (<Container style={{paddingTop:Constants.statusBarHeight}}>
      <Header>
          <Left>
            <Button onPress={() => this.props.navigator.push({name: 'SignIn'})} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Who are you?!</Title>
          </Body>
        </Header> 
        <Content padder>
          <Text>I don't know how you made it this far, but you aren't logged in! Click the back arrow to sign in.</Text>
        </Content>
        </Container>)
    }


    return (
      <Container style={{paddingTop: Constants.statusBarHeight}}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigator.pop()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Add A Provider</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Text>Enter your information below and let's get started!{'\n'}</Text>
          <Form
              ref='form'
              type={addProvider}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />

          <Text></Text>
          
          <Button dark block onPress={this._addProviderButton}>
            <Text>Add Doctor</Text>
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
  }, 
  footer: {
    height: 10 + '%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

