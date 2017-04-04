import React, { Component, PropTypes } from 'react'
import Pencil from '../svgs/Pencil'
import { getSpeed } from '../util/funcs'

function trimDuration (duration) {
  let d = duration
  if (d.startsWith('00:')) {
    d = d.substring(3)
  }
  if (d.startsWith('0')) {
    d = d.substring(1)
  }
  return d
}

function EditButton ({ onEdit, id }) {
  return (
    <button onClick={() => onEdit(id)} className='edit-button'>
      <Pencil color={'#777'} />
    </button>
  )
}

export default class Row extends Component {
  render () {
    const { onEdit, id, jog } = this.props
    const { date, duration, distance } = jog
    const trimmedDuration = trimDuration(duration)
    const speed = getSpeed(duration, distance).toFixed(2)

    return (
      <tr>
        <td>{date}</td>
        <td>{distance.toFixed(2)}</td>
        <td>{trimmedDuration}</td>
        <td>{speed}</td>
        { onEdit && <td> <EditButton onEdit={onEdit} id={id} /> </td> }
      </tr>
    )
  }
}

Row.propTypes = {
  jog: PropTypes.object.isRequired
}
