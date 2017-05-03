import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'

class Main extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route 
            exact path='/'
            // component={Home}
            render={() => (
              <Home 
              token={this.props.token}
              decodedToken={this.props.decodedToken}
              loggedIn={this.props.loggedIn}
              // _decodeToken={this.props._decodeToken}
              />
            )}
          />
          <Route 
            exact path='/login' 
            // _updateToken={this.props._updateToken}
            render={() => ( <Login 
              _updateToken={this.props._updateToken}
              _decodeToken={this.props._decodeToken}
            /> )}
          />
          <Route
            exact path='/register'
            component={Register}
          />
        </Switch>
      </div>
    )
  }
}

export default Main
