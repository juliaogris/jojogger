import React, { PropTypes } from 'react'
import moment from 'moment'
import EditButton from '../elements/EditButton'

const formatDistance = (distance) => {
  if (distance === 0) {
    return '-'
  }
  return distance.toFixed(2)
}

const formatDuration = (duration) => {
  if (duration === '00:00:00' || duration === '0:00:00') {
    return '-'
  }
  let d = duration
  if (d.indexOf('00:') === 0) {
    d = d.substring(3)
  }
  if (d.indexOf('0') === 0) {
    d = d.substring(1)
  }
  return d
}

const getSpeed = (timeStr, distanceKm) => {
  const hours = moment.duration(timeStr).asHours()
  if (hours === 0) {
    return '-'
  }
  return (distanceKm / hours).toFixed(2)
}

const Row = ({ onEdit, id, jog }) => {
  const { date } = jog
  const distance = formatDistance(jog.distance)
  const duration = formatDuration(jog.duration)
  const speed = getSpeed(jog.duration, distance)

  return (
    <tr>
      <td>{date}</td>
      <td>{duration}</td>
      <td>{distance}</td>
      <td>{speed}</td>
      { onEdit && <td> <EditButton onEdit={onEdit} id={id} /> </td> }
    </tr>
  )
}

export default Row

Row.propTypes = {
  jog: PropTypes.object.isRequired
}
