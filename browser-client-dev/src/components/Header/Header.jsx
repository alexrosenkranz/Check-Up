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
    // let token = this.props.token
    // let decoded = jwtDecode(token)
    // const jwt = jwtLib.decode(token)

    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <button onClick={this.props._clearToken}>Logout</button>
        </ul>
        <h1>Hello,from the header</h1>
        {/* <code><p>{token}</p></code>*/}
      </div>
    )
  }
}

export default Header
