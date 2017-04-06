import React, { Component, PropTypes } from 'react'
import { login, signup } from '../util/api'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.validateInput = this.validateInput.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  validateInput () {
    const { email, password } = this.state
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { message: 'Invalid email address format.' }
    }
    if (password.length < 6) {
      return { message: 'Password must be at least 6 characters long.' }
    }
  }

  handleLoginClick (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    const error = this.validateInput()
    if (error) {
      handleAuthError(error)
      return
    }

    const { email, password } = this.state
    setLoading(true)
    login(email, password)
      .then(user => setUser(user))
      .catch(error => handleAuthError(error))
  }

  handleSignupClick (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    setLoading(true)
    const { email, password } = this.state
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
    return (
      <form className='login' action={this.login}>
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
