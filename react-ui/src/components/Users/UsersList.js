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
  const { users, onEdit, onAddClick } = props
  console.log('UsersList.render - users', users)
  if (!users) {
    return null
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
          { users.map(user => <Row key={user.id} user={user} onEdit={onEdit} />) }
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
