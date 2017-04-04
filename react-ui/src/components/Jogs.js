import React, { Component, PropTypes } from 'react'

import Plus from '../svgs/Plus'
import Row from './Row'
import Calendar from './Calendar'

export default class Jogs extends Component {
  constructor () {
    super()
    this.onEdit = this.onEdit.bind(this)
  }

  onEdit (jogId) {
    console.log('onEdit', jogId)
  }

  render () {
    const { startDate, endDate, jogs, onDatesChange } = this.props
    const renderRow = (jog) => (
      <Row
        jog={jog}
        onEdit={this.onEdit}
        id={jog.id}
        key={jog.id} />
    )
    return (
      <div className='page'>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDatesChange={onDatesChange}
        />
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Distance</td>
              <td>Duration</td>
              <td>Speed</td>
              <td>
                <div className='add-button-wrap'>
                  <button className='add-button'><Plus className='add-icon' /></button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            { jogs.map(renderRow) }
          </tbody>
        </table>
      </div>
    )
  }
}

Jogs.propTypes = {
  jogs: PropTypes.array.isRequired
}
