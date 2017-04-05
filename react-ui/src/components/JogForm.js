import React, { Component, PropTypes } from 'react'

export default class JogForm extends Component {
  render () {
    return <div>JogForm</div>
  }
}

JogForm.PropTypes = {
  updateJog: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  setJogs: PropTypes.func.isRequired
}
