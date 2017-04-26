import React, { Component } from 'react'
import { View, StyleSheet, Navigator } from 'react-native'
import { Constants } from 'expo'; 

import { Container, Title,Header, Content, Button, Form, Item, Input, Label, Body, Left, Right, Icon, H1} from 'native-base'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
  }
})
