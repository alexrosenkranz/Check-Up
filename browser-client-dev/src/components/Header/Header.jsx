import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// const jwtLib = require('jsonwebtoken')
// import * as jwtDecode from 'jwt-decode'
// const jwtDecode = require('jwt-decode')

class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render () {
    let navigation
    if (this.props.loggedIn) {
      navigation = (        
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><a onClick={this.props._clearToken}>Logout</a></li>
        </ul>)
    } else {
      navigation = (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      )
    }
    return (
      <div>
        { navigation }
        <h1>Hello, from the header</h1>
        {/* <code><p>{token}</p></code>*/}
      </div>
    )
  }
}

export default Header
