import React, { Component, PropTypes } from 'react'
import { login, signup } from '../util/api'

export default class Login extends Component {
  constructor () {
    super()
    this.validateInput = this.validateInput.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
  }

  handleLoginClick (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    setLoading(true)
    login(this.email.value, this.password.value)
      .then(user => setUser(user))
      .catch(error => handleAuthError(error))
  }

  handleSignupClick (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    setLoading(true)
    signup(this.email.value, this.password.value)
      .then(user => setUser(user))
      .catch(error => handleAuthError(error))
  }

  render () {
    return (
      <form className='login' action={this.login}>
        <input placeholder='email@example.com' type='email' ref={c => (this.email = c)} />
        <input placeholder='your password' type='password' ref={c => (this.password = c)} />
        <div className='button-row'>
          <button onClick={this.handleLoginClick}> Log in </button>
          <button onClick={this.handleSignupClick}> Sign up </button>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  setLoading: PropTypes.func.isRequired,
  handleAuthError: PropTypes.func.isRequired
}
