import React, { PropTypes } from 'react'
import AddButton from '../elements/AddButton'
import EditButton from '../elements/EditButton'
import ErrorMessage from '../elements/ErrorMessage'

const Row = ({ user, onEdit }) =>
  (<tr>
    <td>{user.email}</td>
    <td>{user.role}</td>
    <td> <EditButton onEdit={onEdit} id={user.id} /> </td>
  </tr>)

const UsersList = (props) => {
  const { users, onEdit, onAddClick, authedUser } = props
  if (!users) {
    return null
  }
  let filteredUsers = users
  if (authedUser.role !== 'admin') {
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
            <td className='no-top'>Role</td>
            <td className='no-top'><AddButton onClick={onAddClick} /></td>
          </tr>
        </thead>
        <tbody>
          { filteredUsers.map(user => <Row key={user.id} user={user} onEdit={onEdit} />) }
        </tbody>
      </table>
    </div>
  )
}

UsersList.PropTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}
export default UsersList
