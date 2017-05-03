import React, { Component } from 'react'
import { AsyncStorage, PropTypes, View, StyleSheet, Navigator, Text } from 'react-native'
import { Constants } from 'expo'; 

import { Container, Title,Header, Content, Footer, Button, Form, Item, Input, Label, Body, Left, Right, Icon, Drawer, H1} from 'native-base'

import Appointments from './home/Appointments'
import {_getPatient} from '../lib/apiService'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: '',
      isLoading: true
    }
    this._userLogout = this._userLogout.bind(this)
  }

async _userLogout() {
  try {
    await AsyncStorage.removeItem('access_token');
    alert("Logout Success!")
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}

  _navigate = (route) => {
    this.props.navigator.push({
      name: `${route}`,
      userInfo: this.state.userInfo
    })
  }

   componentWillMount() {
    AsyncStorage.getItem('access_token').then((token) => {
      
      _getPatient(token)
        .then((result) => {
          console.log(result)
          this.setState({userInfo: result})
        }).then(() => {
          this.setState({
          isLoading: false
        })
      })
    })
  }

  _signOut = () => {
    this._userLogout()
    .then(() => {
      this.props.navigator.push({
        name:'SignIn'
      })
    })
  }


  render() {

    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
        
    return (
      <Container style={styles.container}>
        <Header>
          <Body>

         
          <Title style={{fontSize: 27}}> <Icon name='md-checkmark' style={{fontSize: 27,marginRight: 15}}/> Dashboard</Title>
            
          </Body>
          <Right>
 <Button transparent onPress={this._signOut.bind(this)}><Text style={{fontSize: 15}}>Sign Out<Icon name="log-out" style={{marginLeft: 20, fontSize: 15}}/></Text></Button>
          </Right>
        </Header>
        <Content style={{flex:1}}>
        <Content style={{flex: 2, marginBottom: 20, marginTop: 10}}>
        <Appointments userInfo={this.state.userInfo} />
        </Content>
        <Content style={{flex: 1, flexDirection: 'column'}}>
        <Button full style={{flex: 1}} onPress={() => this._navigate('AddAppt')}><Text>Add Appointment</Text></Button>
        <Button full style={{flex: 1}} onPress={() => this._navigate('AddProvider')}><Text>Add Provider</Text></Button>
          </Content>
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  }, 
  footer: {
    height: 10 + '%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}
