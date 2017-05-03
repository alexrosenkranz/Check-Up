import React, { Component } from 'react'
// import * as axios from 'axios'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    // axios.get('/api/v2/all-patients')
    // .then(function(response) {
    //   this.setState({
    //     data: response.data
    //   })
    // }.bind(this))
  }
  render () {

    return (
      <div>
        <h2> Data: </h2>
        <code>
        { JSON.stringify(this.props.decodedToken, null, 4) }
        </code>
      </div>
    )
  }
}

export default Home
