import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import TickButton from '../elements/TickButton'
import DeleteButton from '../elements/DeleteButton'

export default class JogForm extends Component {
  constructor (props) {
    super(props)
    const { jog } = this.props
    this.state = {
      duration: jog ? jog.duration : '01:00:00',
      date: jog ? jog.date : moment().format('YYYY-MM-DD'),
      distance: jog ? jog.distance : 10.0,
      durationError: null,
      dateError: null,
      distanceError: null
    }
    this.validateInput = this.validateInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleInputChange (event) {
    const { name, value } = event.target
    this.setState({ [name]: value, [name + 'Error']: null })
  }

  validateInput () {
    const { date, duration, distance } = this.state
    const m = moment(date, 'YYYY-MM-DD')
    const errors = {}
    if (!m.isValid()) {
      errors.dateError = 'Date is invalid'
    } else if (!m.isSameOrBefore(moment(), 'day')) {
      errors.dateError = 'Date in future is invalid'
    }
    if (duration === '00:00:00') {
      errors.durationError = 'Duration 00:00:00 invalid'
    } else if ((duration.length !== 8) ||
      !moment(duration.substring(2), ':mm:ss').isValid() ||
      isNaN(duration.substring(0, 2)) ||
      Number(duration.substring(0, 2)) < 0) {
      errors.durationError = 'Duration format 02:32:16'
    } else if (moment(duration.substring(2), ':mm:ss').seconds() === 0 &&
      moment(duration.substring(2), ':mm:ss').minutes() === 0 &&
      Number(duration.substring(0, 2)) === 0) {
      errors.durationError = 'Duration 00:00:00 invalid'
    }

    if (isNaN(distance) || Number(distance) <= 0) {
      errors.distanceError = 'Distance format 1.23'
    }
    if (Object.keys(errors).length !== 0) {
      this.setState(errors)
      return null
    }
    const newJog = { date, duration, distance: Number(distance) }
    const { jog } = this.props
    if (jog) {
      newJog.id = jog.id
    }
    return newJog
  }

  handleSubmit (event) {
    event.preventDefault()
    const { updateJog, createJog } = this.props
    const newJog = this.validateInput()
    if (!newJog) {
      return
    }
    if (updateJog) {
      updateJog(newJog)
    } else if (createJog) {
      createJog(newJog)
    }
  }

  handleDelete (event) {
    event.preventDefault()
    const { deleteJog, jog } = this.props
    if (!deleteJog || !jog) {
      return
    }
    deleteJog(jog)
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.onCancel()
  }

  render () {
    const canDelete = !!this.props.jog
    const { date, duration, distance } = this.state
    const { dateError, durationError, distanceError } = this.state
    const { heading } = this.props
    return (
      <form className='jojog-form' action={this.handleSubmit}>
        {heading && <h2>{heading}</h2>}
        <label className={dateError ? 'label-error' : ''}>
          {dateError || 'Date'}
          <input
            type='date'
            name='date'
            value={date}
            onChange={this.handleInputChange}
            className={dateError ? 'input-error' : ''}
          />
        </label>
        <label className={durationError ? 'label-error' : ''}>
          {durationError || 'Duration'}
          <input
            type='text'
            name='duration'
            value={duration}
            onChange={this.handleInputChange}
            className={durationError ? 'input-error' : ''}
          />
        </label>
        <label className={distanceError ? 'label-error' : ''}>
          {distanceError || 'Distance in km'}
          <input
            type='number'
            name='distance'
            step='0.01'
            value={distance}
            onChange={this.handleInputChange}
            className={distanceError ? 'input-error' : ''}
          />
        </label>
        <DeleteButton show={canDelete} onClick={this.handleDelete} item='Jog' />
        <TickButton onClick={this.handleSubmit} />
        <button onClick={this.handleCancel} className='cancel-button'>×</button>
      </form>
    )
  }
}

JogForm.PropTypes = {
  onCancel: PropTypes.func.isRequired
}
