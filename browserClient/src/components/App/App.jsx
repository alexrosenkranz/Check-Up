import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'

// import * as axios from 'axios'
// const jwtDecode = require('jwt-decode')
// import  from 'jwt-decode'
import jwtDecode from 'jwt-decode'

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
    this._decodeToken = this._decodeToken.bind(this)
  }
  componentWillMount() {
    // alert('Componenet will mount')
    const token = localStorage.getItem('token')
    // if (!token) return
    // alert('There is a token ...')
    // check that token hasn't expired
    const decodedToken = this._decodeToken(token)
    if (decodedToken == '') {
      this._clearToken()
      return
    }
    if (decodedToken.exp < Date.now() / 1000) {
      console.log('exp', decodedToken.exp)
      // alert('Expired Token')
      this._clearToken()
    } else {
      // alert('Token not expired')
      this._updateToken(token)
    }
  }
  _updateToken (newToken) {
    // alert('Updating token!')
    const decodedToken = this._decodeToken(newToken)
    // alert(`decoded: ${decodedToken}`)
    this.setState({
      token: newToken,
      decodedToken: decodedToken,
      loggedIn: true,
    })
  }
  _clearToken () {
    // alert('clearing token')
    this.setState({ token: '', decodedToken: '', loggedIn: false })
    localStorage.removeItem('token')
  }
  _decodeToken(token) {
    let decodedToken = ''
    try {
      decodedToken = jwtDecode(token)
    } catch (e) {
      // console.warn(e)
    }
    // alert(`decoded: ${decodedToken}`)
    return decodedToken
  }
  render() {
    return (
      <div>
        <Header 
        token={this.state.token}
        _clearToken={this._clearToken}
        loggedIn={this.state.loggedIn}
        />
        <Main 
        _updateToken={this._updateToken}
        // _decodeToken={this._decodeToken}
        token={this.state.token}
        decodedToken={this.state.decodedToken}
        />
      </div>
    )
  }
}

export default App;
