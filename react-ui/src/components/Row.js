import React, { Component, PropTypes } from 'react'
import Pencil from '../svgs/Pencil'
import {getSpeed} from '../helpers'

function trimTime (timeString) {
  let time = timeString
  if (time.startsWith('00:')) {
    time = time.substring(3)
  }
  if (time.startsWith('0')) {
    time = time.substring(1)
  }
  return time
}

function EditButton ({onEdit, id}) {
  return (
    <button onClick={() => onEdit(id)} className='edit-button'>
      <Pencil color={'#777'} />
    </button>
  )
}

export default class Row extends Component {

  render () {
    const { onEdit, id, run } = this.props
    const { date, time, distance } = run
    const trimmedTime = trimTime(time)
    const speed = getSpeed(time, distance).toFixed(2)

    return (
      <tr>
        <td>{date}</td>
        <td>{distance.toFixed(2)}</td>
        <td>{trimmedTime}</td>
        <td>{speed}</td>
        { onEdit && <td> <EditButton onEdit={onEdit} id={id} /> </td> }
      </tr>
    )
  }
}

Row.propTypes = {
  run: PropTypes.object.isRequired
}
