import React, { Component, PropTypes } from 'react'

export default class Users extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
  }

  render () {
    return (
      <div>Users</div>
    )
  }
}

Users.propTypes = {
  authedUser: PropTypes.object.isRequired }
