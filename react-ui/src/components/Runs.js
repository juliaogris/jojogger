import React, { Component, PropTypes } from 'react'
import { DateRangePicker } from 'react-dates'
import Row from '../components/Row'
import Plus from '../svgs/Plus'
import '../css/datepicker.css'

export default class Runs extends Component {
  constructor () {
    super()
    let focusedInput = null
    this.state = {
      focusedInput,
      startDate: null,
      endDate: null
    }
  }

  onEdit (runId) {
    console.log('onEdit', runId)
  }

  render () {
    const { runs } = this.props
    const runKeys = Object.keys(runs).sort()
    const renderRow = (runKey) => (
      <Row
        run={runs[runKey]}
        onEdit={this.onEdit}
        id={runKey}
        key={runKey} />
    )
    return (
      <div className='runs'>
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          numberOfMonths={1}
          customArrowIcon={<span className='drp'>→</span>}
          customCloseIcon={<span className='drp'>⨉</span>}
          showDefaultInputIcon
          showClearDates
          keepOpenOnDateSelect={false}
          displayFormat='YYYY-MM-DD'
        />
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Distance</td>
              <td>Time</td>
              <td>Speed</td>
              <td>
                <div className='add-button-wrap'>
                  <button className='add-button'><Plus className='add-icon' /></button>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            { runKeys.map(renderRow) }
          </tbody>
        </table>
      </div>
    )
  }
}

Runs.propTypes = {
  runs: PropTypes.object.isRequired
}
