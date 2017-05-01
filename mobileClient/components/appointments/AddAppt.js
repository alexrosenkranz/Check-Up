import React, {Component} from 'react'
import {View, StyleSheet, Navigator, ScrollView } from 'react-native'
import moment from 'moment'
import { Container,Content, Header, Body, Form, Item, Input,  Label, Picker, Button, Text,Left, Title, Right, Icon, H1, H2, H3 } from 'native-base'
import Expo, {Constants} from 'expo';
import Main from '../Main'
import {_addAppointment} from '../../lib/apiService'


export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      gender: '-',
      email: '',
      password: '',
      userInfo: ''
    }
  }

componentDidMount = () => {
  let userInfo = this.props.userInfo
  if (userInfo) { 
    this.setState({userInfo})
  }
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
            <Title>Add an Appointment</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Text>Enter your information below and let's get started!{'\n'}</Text>
          <Item style={styles.item}  floatingLabel>
            <Label>First Name</Label>
            <Input onChangeText={(text) => this.setState({first_name: text})} />
          </Item>
          <Item style={styles.item}  floatingLabel>
            <Label>Last Name</Label>
            <Input onChangeText={(text) => this.setState({last_name: text})} />
          </Item>
         
          <Item style={styles.item}  floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.setState({email: text})} />
          </Item>
          
          <Item style={styles.item}  floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true}  onChangeText={(password) => this.setState({password: password})} />
          </Item>
          <Item style={styles.item} stacked>
          <Label>Gender</Label>
            <Picker
                placeholder="Pick One"
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.gender}
                onValueChange={(gender) => this.setState({gender: gender})}>
                <nativeItem label="Pick One" value="-" />
                <nativeItem label="Female" value="Female" />
                <nativeItem label="Male" value="Male" />
                <nativeItem label="Transgender" value="Transgender" />
                <nativeItem label="I prefer not to identify." value="N/A" />
            </Picker>
          </Item>

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
  }, 
  item: {
    marginBottom: 2 + '%'
  }
}

