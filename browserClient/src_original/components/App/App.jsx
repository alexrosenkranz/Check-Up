import React, { Component } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'


class App extends Component {
  constructor() {
    super();
    this.state = {
      token: ''
    }
  }
  render() {
    return (
      <div>
        <Header name={'Alan'}/>
        <Main />
      </div>
    )
  }
}

export default App;
