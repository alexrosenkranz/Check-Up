import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Content, Form, Item, Input, Label} from 'native-base'
import { Constants } from 'expo'; 

export default class SignIn extends React.Component {

  render() {
    return (
      <View style={styles.container}>
    
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        
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
  }
})

