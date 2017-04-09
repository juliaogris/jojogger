import React from 'react'
import PropTypes from 'prop-types'
import Pencil from '../../svgs/Pencil'
const EditButton = ({ onEdit, id }) => {
  return (
    <button onClick={() => onEdit(id)} className='edit-button'>
      <Pencil color={'#777'} />
    </button>
  )
}

EditButton.PropTypes = {
  onEdit: PropTypes.func.isRequired
}
export default EditButton
