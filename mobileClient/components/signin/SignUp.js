import React, {Component} from 'react'
import {View, StyleSheet, Navigator, ScrollView } from 'react-native'
import moment from 'moment'
import {
  Container,
  Content,
  Header,
  Body,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button,
  Text,
  Left,
  Title,
  Right,
  Icon,
  H1,
  H2,
  H3
} from 'native-base'
import Expo, {Constants} from 'expo';
import Main from '../Main'


export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      gender: '-',
      email: '',
      phoneNumber: '',
      password: ''
    }
  }

  _signUpButton = () => {
    this.props.navigator.push({
      name: 'Dashboard',
      userInfo: this.state
  })
  }

  render() {
    
    const nativeItem= Picker.Item


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
          <Item style={{marginBottom: 2 + '%'}}  floatingLabel>
            <Label>First Name</Label>
            <Input onChangeText={(text) => this.setState({firstName: text})} />
          </Item>
          <Item style={{marginBottom: 2 + '%'}}  floatingLabel>
            <Label>Last Name</Label>
            <Input onChangeText={(text) => this.setState({lastName: text})} />
          </Item>
         
          <Item style={{marginBottom: 2 + '%'}}  floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.setState({email: text})} />
          </Item>
          
          <Item style={{marginBottom: 2 + '%'}}  floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true}  onChangeText={(password) => this.setState({password: password})} />
          </Item>
          <Item style={{marginBottom: 2 + '%'}} stacked>
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

          <Item style={{marginBottom: 2 + '%'}}  floatingLabel>
            <Label>Phone</Label>
            <Input onChangeText={(phone) => this.setState({phoneNumber: phone})} />
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
  }
}

