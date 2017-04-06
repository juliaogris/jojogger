import React, { Component, PropTypes } from 'react'
import ErrorMessage from '../elements/ErrorMessage'
import { getUsers, createUser, updateUser, deleteUser } from '../../util/api'
import UsersList from './UsersList'
import UserForm from './UserForm'

export default class Users extends Component {
  constructor () {
    super()
    this.state = {
      view: 'list', // 'add', 'edit'
      editUser: null,
      error: null,
      loading: false
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.crudUser = this.crudUser.bind(this)
    this.gotoList = this.gotoList.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
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
    const users = await getUsers(this.props.authedUser)
    this.props.setUsers(users)
  }

  handleCreateUser (user) {
    const { authedUser } = this.props
    this.props.setUsers([])
    createUser(authedUser, user)
      .then(j => {
        this.fetchUsers()
      })
      .catch(error => {
        this.mounted && this.setState({ error })
      })
  }

  crudUser (user, apiFunc) {
    const { authedUser } = this.props
    this.setState({ loading: true })
    apiFunc(authedUser, user)
      .then(j => {
        this.fetchUsers()
        if (this.mounted) {
          this.setState({ loading: false, view: 'list' })
        }
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
    const { users } = this.props
    const authedRole = this.props.authedUser.role
    if (error) {
      return <ErrorMessage error={error} onCancel={() => { this.setState({ error: null }) }} />
    }
    if (!users || users.length === 0 || loading) {
      return <p className='info'>Getting users...</p>
    }
    if (view === 'list') {
      return <UsersList users={users} onEdit={this.handleEditClick} onAddClick={this.handleAddClick} {...this.props} />
    }
    if (view === 'add') {
      return <UserForm createUser={this.handleCreateUser} onCancel={this.gotoList} authedRole={authedRole} />
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
  }
}

Users.propTypes = {
  authedUser: PropTypes.object.isRequired,
  setUsers: PropTypes.func.isRequired
}
