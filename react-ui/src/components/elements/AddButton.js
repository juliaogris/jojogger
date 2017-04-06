import React, { PropTypes } from 'react'
import Plus from '../../svgs/Plus'
const PlusButton = ({ onClick }) =>
  <div className='add-button-wrap'>
    <button className='add-button' onClick={onClick}>
      <Plus className='add-icon' />
    </button>
  </div>

PlusButton.PropTypes = {
  onClick: PropTypes.func.isRequired
}
export default PlusButton
