import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'

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
              _decodeToken={this.props._decodeToken}
              />
            )}
          />
          <Route 
            exact path='/Login' 
            // _updateToken={this.props._updateToken}
            render={() => ( <Login 
              updateToken={this.props._updateToken}
              _decodeToken={this.props._decodeToken}
            /> )}
          />
        </Switch>
      </div>
    )
  }
}

export default Main
