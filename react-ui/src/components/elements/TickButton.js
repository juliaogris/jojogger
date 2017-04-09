import React, { PropTypes } from 'react'
import Tick from '../../svgs/Tick'
const TickButton = ({ onClick }) =>
  <div className='tick-button-wrap'>
    <button type='submit' className='tick-button' onClick={onClick}>
      <Tick color='white' className='add-icon' />
    </button>
  </div>

TickButton.PropTypes = {
  onClick: PropTypes.func.isRequired
}
export default TickButton
