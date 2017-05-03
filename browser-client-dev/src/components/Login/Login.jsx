import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as axios from 'axios'


class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      msg: '',
      successfulLogin: false
    }
    // bind class methods
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (propertyName, event) {
    const formData = this.state
    formData[propertyName] = event.target.value
    this.setState(formData)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    axios.post('/auth/login', { email, password }).then(function(response){
      // console.log(response.data)
      if (response.data.msg) {
        this.setState({msg: response.data.msg})
      } else {
        localStorage.setItem('token', response.data.token)
        this.setState({successfulLogin: true})
        alert("Logged in yo!")
        this.props.updateToken(response.data.token)
        // this.props.updateToken('poop')
      }
      // else assume there is no error message
    }.bind(this))
    // make axios request
  } 
  render () {
    if (this.state.successfulLogin) {
      return (
        <div>
          <Redirect to={{
            pathname: '/'
          }}/>
        </div>
      )
    }
    return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Email: 
        <input type="text" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}/>
        </label>
        <label>
          Password: 
        <input type="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
        </label>
        <input type="submit" value="Submit" />
        <button type="button" className="btn"> SUBMIT </button>
        {this.state.msg && <h4>{this.state.msg}</h4>}
      </form>
    </div>
    )
  }
}

// Login.contextTypes = {
//   history: React.PropTypes.object.isRequired,
// }

export default Login
