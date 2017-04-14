import React from 'react'
import { render } from 'react-dom'
// import {Root} from "./components/Root"
// import {Home} from './components/Home'
// import {User} from './components/User'
import {Router, Route, hashHistory} from 'react-router'

class App extends React.Component {
  render() {
    return (
     <h1>It Works!</h1>
    )
  }
}

render(<App/>, document.getElementById('app'))