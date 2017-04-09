import React from 'react'
import PropTypes from 'prop-types'
const JogsButton = ({ onJogsClick, id }) => {
  return (
    <button onClick={() => { onJogsClick(id) }}className='jogs-button'>
      Jogs
    </button>
  )
}

JogsButton.PropTypes = {
  onJogsClick: PropTypes.func.isRequired
}
export default JogsButton
