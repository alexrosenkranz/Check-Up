import React, { Component } from 'react'
import { AsyncStorage, PropTypes, View, StyleSheet, ListView, Navigator, Text } from 'react-native'
import { Constants } from 'expo'; 
import moment from 'moment'
import { Container, Title,Header, Content, Footer, FooterTab, Button, Form, Item, Input, Label, Body, Left, Right, Icon, Drawer, Card, CardItem, H1} from 'native-base'

import {_getPatient} from '../../lib/apiService'

export default class ApptHome extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userInfo: '',
      appointments: '',
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

  _addAppt = () => {
    this.props.navigator.push({
      name: 'AddAppt',
      userInfo: this.state.userInfo
    })
  }

   componentWillMount() {
    AsyncStorage.getItem('access_token').then((token) => {
      
      _getPatient(token)
        .then((result) => {
          console.log(result)
          let appointments = result.appointments.reverse()
          console.log(appointments)
          this.setState({userInfo: result, appointments: this.ds.cloneWithRows(appointments)})
        }).then(() => {
          this.setState({
          isLoading: false
        })
      })
    })  
  }


  _navigate = (route) => {
    this.props.navigator.push({
      name: `${route}`,
      userInfo: this.state.userInfo
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
          <Left>
            <Button onPress={() => this.props.navigator.pop()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>Your Appointments</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this._navigate('AddAppt')}><Icon name="md-add"/></Button>
          </Right>
        </Header>
        <Content style={{flex:1}}>
          <ListView
          dataSource={this.state.appointments}
          renderRow={(appointment) => 
              <Card>
                <CardItem>
                    <Left>
                        <Body>
                          <Text style={{fontWeight: '700'}}>{moment(appointment.appTime).format('"dddd, MMMM Do YYYY, h:mm a')}</Text>
                          <Text>{this.state.userInfo.providers.map((provider, index) => {
                            if (provider._id === appointment.provider) {
                              return provider.name
                            }
                          })
                          
                        }</Text>
                          <Text>{appointment.notes}</Text>
                        </Body>
                    </Left>
                  </CardItem>
            </Card>   
        }/>
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  }, 
  footer: {
    height: 10 + '%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}
