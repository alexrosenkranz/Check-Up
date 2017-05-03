import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as axios from 'axios'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
      errMsg: '',
      successfulRegistration: false
    }
    // bind class methods
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (propertyName, event) {
    const formData = this.state
    formData[propertyName] = event.target.value
    this.setState(formData)
  }
  handleSubmit (e) {
    e.preventDefault()
    const { email, password, password2, first_name, last_name } = this.state
    // TO DO: validate form, make it a switch?
    if (first_name === '') {
      this.setState({ errMsg: 'First name can not be empty'})
      return
    } else if (last_name === '') {
      this.setState({ errMsg: 'Last name can not be empty'})
      return
    }else if (password !== password2) {
      this.setState({ errMsg: 'Passwords must match' })
      return
    }
    // console.log('making request')
    console.log(email)
    axios.post('/api/v2/new-patient', { email, password, first_name, last_name})
    .then(function(response){
      if (response.data.err) {
        console.log('there was an error signing you up')
        this.setState({errMsg: 'something went wrong'})
      } else {
        this.setState({successfulRegistration: true})
      }
    }.bind(this))
  }
  render () {
    if (this.state.successfulRegistration) {
      return (
        <Redirect to={{ pathname: '/login' }}/>
      )
    }
    return (
      <div>
        <h2>Welcome to the registration form</h2>
        <form>
        {/* lot of repetition ... should probably put in new COMPONENT!*/}
          <label>
            First Name: 
          <input type="text" onChange={this.handleChange.bind(this, 'first_name')} value={this.state.first_name}/>
          </label>
          <label>
            Last Name: 
          <input type="text" onChange={this.handleChange.bind(this, 'last_name')} value={this.state.last_name}/>
          </label>
          <label>
            Email: 
          <input type="text" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}/>
          </label>
        <label>
          Password: 
        <input type="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
        </label>
        <label>
          Confirm Password: 
        <input type="password" onChange={this.handleChange.bind(this, 'password2')} value={this.state.password2}/>
        </label>
        <button onClick={this.handleSubmit}>Register</button>
        {this.state.errMsg && <h4>{this.state.errMsg}</h4>}
        </form>
      </div>
    )
  }
}

export default Register