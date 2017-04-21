import React from 'react'
import axios from 'axios'

class TestApi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Al Chew',
      patients: []
    }
  }
  componentDidMount () {
    axios.get('/api/v1/all-patients')
    .then((response) => {
      this.setState({
        patients: response.data
      })
    }).catch((err) => {
      console.warn(err)
    })
  }
  render () {
    // const var
    return (
      <div>
        <h1>Hello from TestApi Component</h1>
        <p>Hi from {this.state.name}</p>
        <p>Below are the results from my request: </p>
        <pre><code>
          { JSON.stringify(this.state.patients, null, 4)}
        </code></pre>
      </div>
    )
  }
}

// TestApi.propTypes = {}

export default TestApi
