import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

// (<h1>You are at the Login page</h1>)
const Login = () => (
  <form>
    <FormGroup
      controlId="formBasicText"
      validationState={this.getValidationState()}
    >
      <ControlLabel>Working example with validation</ControlLabel>
      <FormControl
        type="text"
        value={this.state.value}
        placeholder="Enter text"
        onChange={this.handleChange}
      />
      <FormControl.Feedback />
      <HelpBlock>Validation is based on string length.</HelpBlock>
    </FormGroup>
  </form>
)
// class Login extends Component {

// }

export default Login
