import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { login, signup } from '../util/api'
import { getEmailError, getPasswordError } from '../util/funcs'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleLoginClick (event) {
    event.preventDefault()
    const { email, password } = this.state
    const { setLoading, setUser, handleAuthError } = this.props
    const error = getEmailError(email) || getPasswordError(password)
    if (error) {
      handleAuthError(error)
      return
    }

    setLoading(true)
    login(email, password)
      .then(user => setUser(user))
      .catch(error => handleAuthError(error))
  }

  handleSignupClick (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    const { email, password } = this.state
    const error = getEmailError(email) || getPasswordError(password)
    if (error) {
      handleAuthError(error)
      return
    }

    setLoading(true)
    signup(email, password)
      .then(user => setUser(user))
      .catch(error => handleAuthError(error))
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render () {
    const { email, password } = this.state
    const { authError } = this.props
    return (
      <form className='login' action={this.login}>
        {authError && <div className='auth-error'>{authError.message}</div>}
        <input
          placeholder='email@example.com'
          type='email'
          name='email'
          value={email}
          onChange={this.handleInputChange}
        />
        <input
          placeholder='your password'
          type='password'
          name='password'
          value={password}
          onChange={this.handleInputChange}
          />
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
