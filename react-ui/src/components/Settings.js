import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { updateUser, deleteUser } from '../util/api'
import { getEmailError, getPasswordError } from '../util/funcs'
import TickButton from './elements/TickButton'
import DeleteButton from './elements/DeleteButton'

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      email: this.props.user.email,
      password: '',
      deleteConfirm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
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

  handleDeleteClick () {
    const { user, signOut } = this.props
    deleteUser(user, user)
    .then(() => {
      signOut()
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
    const { email, password, error, deleteConfirm } = this.state
    if (deleteConfirm) {
      return (<div className='login'>
        <p>Are you sure you want to delete this account?</p>
        <div className='button-row'>
          <button onClick={() => this.setState({ deleteConfirm: false })}> No </button>
          <button onClick={this.handleDeleteClick}> Yes </button>
        </div>
      </div>)
    }

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
        <DeleteButton
          show
          onClick={(e) => { e.preventDefault(); this.setState({ deleteConfirm: true }) }}
          item='Account' />
        <TickButton onClick={this.handleSubmit} />
      </form>
    )
  }
}
Settings.propTypes = {
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
}
