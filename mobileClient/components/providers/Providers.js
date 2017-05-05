import React, { Component } from 'react'
import { AsyncStorage, PropTypes, View, StyleSheet, ListView, Navigator, Text } from 'react-native'
import { Constants } from 'expo'; 

import { Container, Title,Header, Content, Footer, FooterTab, Button, Form, Item, Input, Label, Body, Left, Right, Icon, Card, CardItem, H1} from 'native-base'

import {_getPatient} from '../../lib/apiService'

export default class Providers extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userInfo: '',
      providers: '',
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


   componentDidMount() {
    const userInfo = this.props.userInfo
    this.setState({
      userInfo: userInfo,
      providers: this.ds.cloneWithRows(userInfo.providers),
      isLoading: false})
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
    console.log(this.state.userInfo.providers)
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
            <Title>Your Health Providers</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this._navigate('AddProvider')}><Icon name="md-add"/></Button>
          </Right>
        </Header>
        <Content style={{flex:1}}>
          <ListView
          dataSource={this.state.providers}
          renderRow={(provider) => 
              <Card>
                <CardItem>
                    <Left>
                        <Body>
                          <Text style={{fontWeight: '700'}}>{provider.name}</Text>
                          <Text>{provider.specialty}</Text>
                          <Text>{provider.phone}</Text>
                          <Text>{provider.address}</Text>
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
