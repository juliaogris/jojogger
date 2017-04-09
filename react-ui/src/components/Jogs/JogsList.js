import React, { PropTypes } from 'react'
import AddButton from '../elements/AddButton'
import Calendar from './Calendar'
import Row from './Row'

const JogRow = ({ jog, onEdit }) =>
  <Row jog={jog} onEdit={onEdit} id={jog.id} key={jog.id} />

const JogCalendar = ({ startDate, endDate, onDatesChange }) =>
  <Calendar startDate={startDate} endDate={endDate} onDatesChange={onDatesChange} />

const JogsList = (props) => {
  const { jogs, onEdit, onAddClick, onCancel, heading } = props
  return (
    <div className='page'>
      {heading && <h2>{heading}</h2>}
      {onCancel && <button onClick={onCancel} className='cancel-button'>×</button> }
      <JogCalendar {...props} />
      <table>
        <thead>
          <tr>
            <td>Date</td><td>Distance</td><td>Duration</td><td>Speed</td>
            <td><AddButton onClick={onAddClick} /></td>
          </tr>
        </thead>
        <tbody>
          { jogs.map(jog => <JogRow key={jog.id} jog={jog} onEdit={onEdit} />) }
        </tbody>
      </table>
    </div>
  )
}

JogsList.PropTypes = {
  jogs: PropTypes.array.isRequired,
  onDatesChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}
export default JogsList
