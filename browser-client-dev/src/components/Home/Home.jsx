import React, { Component } from 'react'
import * as axios from 'axios'

// const Home = () => (<h1>You are at the home page</h1>)
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    axios.get('/api/v2/all-patients')
    .then(function(response) {
      this.setState({
        data: response.data
      })
    }.bind(this))
  }
  render () {
    return (
      <div>
        <h2> Data: </h2>
        {/*
       <code>
        { JSON.stringify(this.state.data, null, 4) }
        </code>
        */}
      </div>
    )
  }
}

export default Home
