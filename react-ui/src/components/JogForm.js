import React, { Component, PropTypes } from 'react'
import moment from 'moment'

export default class JogForm extends Component {
  render () {
    const { onCancel } = this.props
    return (
      <form>
        <label>Date</label>
        <input placeholder={moment().format('YYYY-MM-DD')} type='date' ref={c => (this.date = c)} />
        <label>Duration</label>
        <input placeholder={'01:38:12'} type='text' ref={c => (this.duration = c)} />
        <label>Distance in km</label>
        <input placeholder={'17.8'} type='text' ref={c => (this.distance = c)} />
        <button type='submit'>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    )
  }
}

JogForm.PropTypes = {
  updateJog: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  setJogs: PropTypes.func.isRequired
}
