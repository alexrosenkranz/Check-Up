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
      decodedToken: '',
      loggedIn: false
    }
    this._updateToken = this._updateToken.bind(this)
    this._clearToken = this._clearToken.bind(this)
  }
  componentWillMount() {
    let token = localStorage.getItem('token')
    this.setState({ token })
    // let decodedToken
    // try {
    //   decodedToken = jwtDecode(token)
    //   // check if the decodedToken is not expired
    //   console.log(decodedToken)
    //   if (decodedToken.exp < Date.now() / 1000) {
    //     console.log('expired yo!')
    //   }
    //   // console.log(decodedToken)
    // } catch (e) {
    //   console.log(e)
    //   console.log('Catch')
    //   decodedToken = {}
    //   token = ''
    //   localStorage.clearItem('token')
    // }
    // this.setState({ token, decodedToken })
  }
  _updateToken (newToken) {
    alert('Updating token!')
    let decodedToken = ''
    try {
      decodedToken = jwtDecode(newToken)
    } catch (e) {
      console.warn(e)
    }
    this.setState({
      token: newToken,
      decodedToken: decodedToken,
      loggedIn: true,
    })
  }
  _clearToken () {
    alert('clearing token')
    this.setState({ token: '', decodedToken: '', loggedIn: false })
    localStorage.removeItem('token')
  }
  render() {
    return (
      <div>
        <Header token={this.state.token} _clearToken={this._clearToken}/>
        <Main _updateToken={this._updateToken}/>
      </div>
    )
  }
}

export default App;
