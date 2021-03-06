import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'

class Main extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Login' component={Login}/>
        </Switch>
      </div>
    )
  }
}

export default Main
