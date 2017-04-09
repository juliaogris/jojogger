import React from 'react'
import PropTypes from 'prop-types'

const DeleteButton = ({ show, onClick, item }) => {
  if (!show) {
    return null
  }
  return (
    <div className='delete-row'>
      <span className='delete-button' onClick={onClick}>
        Delete this {item}
      </span>
    </div>)
}
DeleteButton.PropTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired
}

export default DeleteButton
