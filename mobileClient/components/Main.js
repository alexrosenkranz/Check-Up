import React, { Component } from 'react'
import { View, StyleSheet, Navigator, Text } from 'react-native'
import { Constants } from 'expo'; 

import { Container, Title,Header, Content, Button, Form, Item, Input, Label, Body, Left, Right, Icon, Drawer, H1} from 'native-base'

import Appointments from './home/Appointments'
import SideBar from './Sidebar';

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: this.props.userInfo,
      firstName: 'Alex'
    }
  }





  render() {
        
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button onPress={this.props.navigator._openDrawer} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{flex:1}}>
        <Content style={{flex: 2, marginBottom: 20, marginTop: 10}}>
        <Appointments firstName={this.state.firstName} />
        </Content>
        <Content style={{flex: 1}}>
        <Button full style={{flex: 2}}><Text>Add Appointment</Text></Button>
        <Button full><Text>Add Appointment</Text></Button>
          </Content>
        </Content>
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
  }
}
