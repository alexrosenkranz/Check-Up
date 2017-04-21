import React from 'react'

class TestApi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Al Chew'
    }
  }
  render () {
    // const var
    return (
      <div>
        <h1>Hello from TestApi Component</h1>
        <p>Hi from {this.state.name}</p>
      </div>
    )
  }
}

export default TestApi
