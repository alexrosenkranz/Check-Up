import React, { Component } from 'react'
// import * as axios from 'axios'
// const jwtDecode = require('jwt-decode')
// import * as jwtDecode from 'jwt-decode'

// const Home = () => (<h1>You are at the home page</h1>)
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    // this._decodeToken = this._decodeToken.bind(this)
  }
  componentDidMount () {
    // axios.get('/api/v2/all-patients')
    // .then(function(response) {
    //   this.setState({
    //     data: response.data
    //   })
    // }.bind(this))
  }
  // _decodeToken (token) {
  //   let decodedToken = ''
  //   try {
  //     decodedToken = jwtDecode(token)
  //   } catch (e) {
  //     // console.warn(e)
  //   }
  //   return decodedToken
  // }
  render () {
    // let decoded = this.props._decodeToken(this.props.token)
    // let decoded = 'dtes'
    return (
      <div>
        <h2> Data: </h2>
        <code>
        { JSON.stringify(this.props.decodedToken, null, 4) }
        </code>
        {/*
       <code>
        { JSON.stringify(decoded, null, 4) }
        { JSON.stringify(this.props.token, null, 4) }
        </code>
        */}
      </div>
    )
  }
}

export default Home
