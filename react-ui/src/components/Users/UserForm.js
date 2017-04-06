import React, { Component, PropTypes } from 'react'

import TickButton from '../elements/TickButton'
import DeleteButton from '../elements/DeleteButton'
import { getEmailError, getPasswordError } from '../../util/funcs'

const RoleSelect = ({ authedRole, role, onChange }) => {
  if (authedRole !== 'admin') {
    return null
  }
  return (
    <label>
      Role
      <select value={role} onChange={onChange} name='role'>
        <option value='regular'>Regular</option>
        <option value='manager'>Manager</option>
        <option value='admin'>Admin</option>
      </select>
    </label>)
}

export default class UserForm extends Component {
  constructor (props) {
    super(props)
    const { user } = this.props
    this.state = {
      email: user ? user.email : '',
      password: '',
      role: user ? user.role : 'regular',
      emailError: null,
      passwordError: null
    }
    this.valiemailInput = this.valiemailInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value, [name + 'Error']: null })
  }

  valiemailInput () {
    const { email, password, role } = this.state
    const errors = {}
    const emailError = getEmailError(email)
    if (emailError) {
      errors.emailError = emailError.message
    }
    if (password) {
      const passwordError = getPasswordError(password)
      if (passwordError) {
        errors.passwordError = 'Password min 6 letters'
      }
    }

    if (Object.keys(errors).length !== 0) {
      this.setState(errors)
      return null
    }
    const newUser = { email, role }
    if (password) {
      newUser.password = password
    }
    const { user } = this.props
    if (user) {
      newUser.id = user.id
    }
    return newUser
  }

  handleSubmit (event) {
    event.preventDefault()
    const { updateUser, createUser } = this.props
    const newUser = this.valiemailInput()
    if (!newUser) {
      return
    }
    if (updateUser) {
      updateUser(newUser)
    } else if (createUser) {
      createUser(newUser)
    }
  }

  handleDelete (event) {
    event.preventDefault()
    const { deleteUser, user } = this.props
    if (!deleteUser || !user) {
      return
    }
    deleteUser(user)
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.onCancel()
  }

  render () {
    const canDelete = !!this.props.user
    const { authedRole } = this.props
    const { email, password, role } = this.state
    const { emailError, passwordError } = this.state
    return (
      <form className='jojog-form' action={this.handleSubmit}>
        <label className={emailError ? 'label-error' : ''}>
          {emailError || 'Email'}
          <input
            type='email'
            name='email'
            value={email}
            onChange={this.handleInputChange}
            className={emailError ? 'input-error' : ''}
          />
        </label>
        <label className={passwordError ? 'label-error' : ''}>
          {passwordError || 'Password'}
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleInputChange}
            className={passwordError ? 'input-error' : ''}
          />
        </label>
        <RoleSelect authedRole={authedRole} role={role} onChange={this.handleInputChange} />
        <DeleteButton show={canDelete} onClick={this.handleDelete} item='User' />
        <TickButton onClick={this.handleSubmit} />
        <button onClick={this.handleCancel} className='cancel-button'>×</button>
      </form>
    )
  }
}

UserForm.PropTypes = {
  onCancel: PropTypes.func.isRequired,
  authedRole: PropTypes.func.isRequired
}
