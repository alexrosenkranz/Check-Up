import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text} from 'native-base'
import { Constants } from 'expo'; 

export default class SignIn extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        
          <Item rounded>
            <Input placeholder='Email'/>
          </Item>
          <Item rounded>
            <Input placeholder='Password'/>
          </Item>
          <Button dark rounded>
            <Text>Dark</Text>
          </Button>
      </View>
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
  button: {
    color: '#fff'
  }
})

