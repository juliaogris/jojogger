import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from '../elements/ErrorMessage'
import { getUsers, createUser, updateUser, deleteUser } from '../../util/api'
import AdminJogs from './AdminJogs'
import UsersList from './UsersList'
import UserForm from './UserForm'

export default class Users extends Component {
  constructor () {
    super()
    this.state = {
      view: 'list', // 'add', 'edit, jogs'
      editUser: null,
      error: null,
      loading: false
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleJogsClick = this.handleJogsClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.crudUser = this.crudUser.bind(this)
    this.gotoList = this.gotoList.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleAddUser = this.handleAddUser.bind(this)
  }

  gotoList () {
    this.setState({ view: 'list' })
  }

  handleEditClick (id) {
    const { users } = this.props
    const user = users.find(u => u.id === id)
    const editUser = { ...user }
    this.setState({ view: 'edit', editUser })
  }

  handleJogsClick (id) {
    const { users } = this.props
    const user = users.find(u => u.id === id)
    this.setState({ view: 'jogs', editUser: user })
  }

  handleAddClick (event) {
    event.preventDefault()
    this.setState({ view: 'add' })
  }

  componentWillMount () {
    this.mounted = true
    const { users } = this.props
    if (!users || users.length === 0) {
      this.fetchUsers()
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  async fetchUsers () {
    const { setUsers } = this.props
    getUsers(this.props.authedUser)
      .then((users) => setUsers(users))
      .catch((error) => this.mounted && this.setState({ error }))
  }

  crudUser (user, apiFunc) {
    const { authedUser } = this.props
    if (authedUser.role !== 'admin') {
      user = { ...user }
      delete user.role
    }
    this.setState({ loading: true })
    apiFunc(authedUser, user)
      .then((u) => {
        return this.fetchUsers()
      })
      .then((users) => {
        this.props.setUsers(users)
      })
      .catch(error => {
        if (this.mounted) {
          this.setState({ error, loading: false })
        }
      })
  }

  handleUpdateUser (user) {
    this.crudUser(user, updateUser)
  }

  handleDeleteUser (user) {
    this.crudUser(user, deleteUser)
  }

  handleAddUser (user) {
    this.crudUser(user, createUser)
  }

  render () {
    const { view, editUser, error, loading } = this.state
    const { users, authedUser } = this.props
    const authedRole = authedUser.role
    if (error) {
      return <ErrorMessage error={error} onCancel={() => { this.setState({ error: null }) }} />
    }
    if (!users || users.length === 0 || loading) {
      return <p className='info'>Getting users...</p>
    }
    if (view === 'list') {
      return <UsersList
        users={users}
        onEdit={this.handleEditClick}
        onAddClick={this.handleAddClick}
        onJogsClick={this.handleJogsClick}
        {...this.props}
      />
    }
    if (view === 'add') {
      return <UserForm createUser={this.handleAddUser} onCancel={this.gotoList} authedRole={authedRole} />
    }
    if (view === 'edit') {
      return <UserForm
        updateUser={this.handleUpdateUser}
        deleteUser={this.handleDeleteUser}
        onCancel={this.gotoList}
        user={editUser}
        authedRole={authedRole}
      />
    }
    if (view === 'jogs') {
      return <AdminJogs
        onCancel={this.gotoList}
        user={editUser}
        admin={authedUser} />
    }
  }
}

Users.propTypes = {
  authedUser: PropTypes.object.isRequired,
  setUsers: PropTypes.func.isRequired
}
