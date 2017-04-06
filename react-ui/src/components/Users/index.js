import React, { Component, PropTypes } from 'react'
import ErrorMessage from '../elements/ErrorMessage'
import { getUsers, createUser, updateUser, deleteUser } from '../../util/api'
import UsersList from './UsersList'
import UserForm from './UserForm'

export default class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null, // this.props.users,
      view: 'list', // 'add', 'edit'
      editUser: null,
      error: null
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.crudUser = this.crudUser.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }

  handleEditClick (id) {
    const { users } = this.state
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
    this.fetchUsers()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  async fetchUsers () {
    console.log('Users.fetchUsers')
    const users = await getUsers(this.props.authedUser)
    if (this.mounted) {
      this.setState({ users, view: 'list' })
    }
    // this.props.setUsers(users)
  }

  handleCreateUser (user) {
    const { authedUser } = this.props
    this.setState({ users: null })
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
    this.setState({ users: null })
    apiFunc(authedUser, user)
      .then(j => {
        console.log('User.js. crud - done')
        this.fetchUsers()
      })
      .catch(error => {
        if (this.mounted) {
          this.setState({ error })
        }
        this.fetchUsers()
      })
  }

  handleUpdateUser (user) {
    this.crudUser(user, updateUser)
  }

  handleDeleteUser (user) {
    console.log('User.js.handleDelteUser')
    this.crudUser(user, deleteUser)
  }

  handleAddUser (user) {
    this.crudUser(user, createUser)
  }

  render () {
    console.log('Users.render', JSON.stringify(this.state), JSON.stringify(this.props))
    const { users, view, editUser, error } = this.state
    const authedRole = this.props.authedUser.role
    if (error) {
      return <ErrorMessage error={error} onCancel={() => { this.setState({ error: null }) }} />
    }
    if (users === null) {
      return <p className='info'>Getting users...</p>
    }
    if (view === 'list') {
      console.log('Users.render - list', users)
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
  authedUser: PropTypes.object.isRequired
  // setUsers: PropTypes.func.isRequired
}
