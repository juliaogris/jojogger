import React from 'react'
import PropTypes from 'prop-types'

const ErroMessage = ({ onCancel, error }) => {
  if (!error) {
    return null
  }
  const clickHandler = (event) => {
    event.preventDefault()
    onCancel(null)
  }
  return (
    <div className='page error'>
      {error.message}
      <button onClick={clickHandler} className='error-cancel-button'>×</button>
    </div>
  )
}
ErroMessage.PropTypes = {
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
}

export default ErroMessage
