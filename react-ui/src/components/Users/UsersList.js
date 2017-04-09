import React from 'react'
import PropTypes from 'prop-types'
import AddButton from '../elements/AddButton'
import EditButton from '../elements/EditButton'
import JogsButton from '../elements/JogsButton'
import ErrorMessage from '../elements/ErrorMessage'

const Row = ({ user, onEdit, onJogsClick, admin }) =>
  (<tr>
    <td>{user.email}</td>
    { admin && <td>{user.role}</td> }
    { admin && <td><JogsButton onJogsClick={onJogsClick} id={user.id} /></td> }
    <td> <EditButton onEdit={onEdit} id={user.id} /> </td>
  </tr>)

const UsersList = (props) => {
  const { users, onEdit, onAddClick, authedUser, onJogsClick } = props
  const admin = authedUser.role === 'admin'
  if (!users) {
    return null
  }
  let filteredUsers = users
  if (!admin) {
    filteredUsers = users.filter(u => u.role === 'regular')
  }
  if (filteredUsers.length === 0) {
    return <p className='info'>No users with "regular" role.</p>
  }
  return (
    <div className='page'>
      <ErrorMessage {...props} />
      <table>
        <thead>
          <tr>
            <td className='no-top'>Email</td>
            {admin && <td className='no-top'>Role</td> }
            {admin && <td className='no-top' /> }
            <td className='no-top'><AddButton onClick={onAddClick} /></td>
          </tr>
        </thead>
        <tbody>
          { filteredUsers.map(user =>
            <Row
              key={user.id}
              user={user}
              onEdit={onEdit}
              admin={admin}
              onJogsClick={onJogsClick}
            />) }
        </tbody>
      </table>
    </div>
  )
}

UsersList.PropTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onJogsClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}
export default UsersList
