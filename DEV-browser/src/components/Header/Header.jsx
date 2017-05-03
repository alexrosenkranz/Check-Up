import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <h1>Hello "{this.props.name}",from the header</h1>
      </div>
    )
  }
}

export default Header
