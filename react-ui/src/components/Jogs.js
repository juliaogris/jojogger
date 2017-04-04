import React, { Component, PropTypes } from 'react'
import { DateRangePicker } from 'react-dates'
import Row from '../components/Row'
import Plus from '../svgs/Plus'
import '../css/datepicker.css'
import moment from 'moment'

export default class Jogs extends Component {
  constructor () {
    super()
    let focusedInput = null
    this.state = {
      focusedInput,
      jogs: [],
      startDate: null,
      endDate: null
    }
    this.onDatesChange = this.onDatesChange.bind(this)
  }

  onEdit (jogId) {
    console.log('onEdit', jogId)
  }

  onDatesChange ({ startDate, endDate }) {
    const between = j => moment(j.date).isBetween(startDate, endDate, 'day', '[]')
    const jogs = this.props.jogs.filter(between)
    this.setState({ startDate, endDate, jogs })
  }

  componentWillReceiveProps (nextProps) {
    const { jogs } = nextProps
    let startDate = null
    let endDate = null
    if (jogs.length > 0) {
      startDate = moment(jogs[0].date)
      endDate = moment(jogs[jogs.length - 1].date)
    }
    this.setState({ startDate, endDate, jogs })
  }

  render () {
    const { startDate, endDate, jogs } = this.state
    const renderRow = (jog) => (
      <Row
        jog={jog}
        onEdit={this.onEdit}
        id={jog.id}
        key={jog.id} />
    )
    return (
      <div className='jogs'>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          numberOfMonths={1}
          customArrowIcon={<span className='drp'>→</span>}
          customCloseIcon={<span className='drp'>⨉</span>}
          showDefaultInputIcon
          showClearDates
          keepOpenOnDateSelect={false}
          isOutsideRange={day => !(day.isSameOrBefore(moment(), 'day'))}
          displayFormat='YYYY-MM-DD'
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
