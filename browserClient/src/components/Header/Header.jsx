import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// const jwtLib = require('jsonwebtoken')
// import * as jwtDecode from 'jwt-decode'
// const jwtDecode = require('jwt-decode')

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    let element
    if (this.props.loggedIn) {
      element = (<li><a onClick={this.props._clearToken}>Logout</a></li>)
    } else {
      element = (<li><Link to='/login'>Login</Link></li>)
    }
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          {element}
        </ul>
        <h1>Hello,from the header</h1>
        {/* <code><p>{token}</p></code>*/}
      </div>
    )
  }
}

export default Header
