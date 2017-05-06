import React, { Component } from 'react'
import { AsyncStorage, PropTypes, ListView, View, StyleSheet, Navigator, Text } from 'react-native'
import { Constants } from 'expo'; 
import { Container, Title, Header, Content, Footer, FooterTab, Button, Form, Item, Input, Label, Body, Left, Right, Icon, Card, CardItem, H1} from 'native-base'
import moment from 'moment'

export default class Main extends Component {
  constructor(props) {

    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userInfo: '',
      appointment: '',
      isLoading: true,
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
  let userInfo = this.props.userInfo
  let appointment = this.props.userInfo.appointments.filter((appointment) => {
    if (appointment._id === this.props.id) {
      return appointment
    }
  })
  console.log(appointment)
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
          <Body>

         
          <Title style={{fontSize: 27}}> <Icon name='md-checkmark' style={{fontSize: 27,marginRight: 15}}/> Dashboard</Title>
            
          </Body>
          <Right>
 <Button transparent onPress={this._signOut.bind(this)}><Text style={{fontSize: 17}}>Sign Out <Icon name="log-out" style={{marginLeft: 20, fontSize: 17}}/></Text></Button>
          </Right>
         
        </Header>
        <Container style={{flex: 3, marginBottom: 20, marginTop: 10}}>
           <ListView
          dataSource={this.state.appointments}
          renderRow={(appointment) => 
              <Card>
                <CardItem>
                    <Left>
                        <Body>
                          <Text style={{fontWeight: '700'}}>{moment(appointment.appTime).format('dddd, MMMM Do YYYY @ h:mm a')}</Text>
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
        </Container>
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
