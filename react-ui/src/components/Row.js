import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Pencil from '../svgs/Pencil'

export default class Row extends Component {
  render () {
    const { onEdit, id, jog } = this.props
    const { date } = jog
    const distance = formatDistance(jog.distance)
    const duration = formatDuration(jog.duration)
    const speed = getSpeed(duration, distance)

    return (
      <tr>
        <td>{date}</td>
        <td>{distance}</td>
        <td>{duration}</td>
        <td>{speed}</td>
        { onEdit && <td> <EditButton onEdit={onEdit} id={id} /> </td> }
      </tr>
    )
  }
}

Row.propTypes = {
  jog: PropTypes.object.isRequired
}

function formatDistance (distance) {
  if (distance === 0) {
    return '-'
  }
  return distance.toFixed(2)
}

function formatDuration (duration) {
  if (duration === '00:00:00' || duration === '0:00:00') {
    return '-'
  }
  let d = duration
  if (d.startsWith('00:')) {
    d = d.substring(3)
  }
  if (d.startsWith('0')) {
    d = d.substring(1)
  }
  return d
}

function getSpeed (timeStr, distanceKm) {
  const hours = moment.duration(timeStr).asHours()
  if (hours === 0) {
    return '-'
  }
  return (distanceKm / hours).toFixed(2)
}

function EditButton ({ onEdit, id }) {
  return (
    <button onClick={() => onEdit(id)} className='edit-button'>
      <Pencil color={'#777'} />
    </button>
  )
}
