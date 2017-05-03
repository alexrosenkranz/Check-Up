import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

// import * as axios from 'axios'
const jwtDecode = require('jwt-decode')

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      token: '',
      decodedToken: {},
      isLoggedIn: false,
    }
  }
  // componentWillMount() {
  //   var token = localStorage.getItem('token')
  //   this.setState({ token: token })
  // }
  componentDidMount() {
    let token = localStorage.getItem('token')
    let decodedToken
    // let decodedToken = jwtDecode('token')
    try {
      decodedToken = jwtDecode(token)
      // console.log('Try')
      // console.log(decodedToken)
    } catch (e) {
      console.log(e)
      console.log('Catch')
      decodedToken = {}
      token = ''
      localStorage.clearItem('token')
    }
    this.setState({ token, decodedToken })
  }
  render() {
    return (
      <div>
        <Header token={this.state.token}/>
        <Main />
      </div>
    )
  }
}

export default App;
