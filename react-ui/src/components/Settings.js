import React, { Component, PropTypes } from 'react'
import { updateUser } from '../util/api'
import { getEmailError, getPasswordError } from '../util/funcs'
import TickButton from './elements/TickButton'

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      email: this.props.user.email,
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const authedUser = this.props.user
    const { email, password } = this.state
    let error = getEmailError(email)
    const updatedUser = { email, id: authedUser.id }
    if (password) {
      updatedUser.password = password
      error = error || getPasswordError(password)
    }

    if (error) {
      this.setState({ error })
      return
    }
    updateUser(authedUser, updatedUser)
      .then(() => {
        this.props.signOut()
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value, error: null })
  }

  render () {
    const { email, password, error } = this.state

    return (
      <form className='jojog-form' action={this.handleSubmit}>
        {error && <div className='settings-error'>{error.message}</div>}
        <label>email</label>
        <input
          placeholder='email@example.com'
          type='email'
          name='email'
          value={email}
          onChange={this.handleInputChange}
        />
        <label>password</label>
        <input
          placeholder='your password'
          type='password'
          name='password'
          value={password}
          onChange={this.handleInputChange}
          />
        <TickButton onClick={this.handleSubmit} />
      </form>
    )
  }
}
Settings.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
}
