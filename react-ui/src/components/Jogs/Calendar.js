import React, { PropTypes, Component } from 'react'
import { DateRangePicker } from 'react-dates'
import '../../css/datepicker.css'
import moment from 'moment'

export default class Login extends Component {
  constructor () {
    super()
    this.state = { focusedInput: null }
  }
  render () {
    const { startDate, endDate, onDatesChange } = this.props
    return (
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDatesChange={onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => { this.setState({ focusedInput }) }}
        numberOfMonths={1}
        customArrowIcon={<span className='drp'>→</span>}
        customCloseIcon={<span className='drp'>⨉</span>}
        showDefaultInputIcon
        showClearDates
        keepOpenOnDateSelect={false}
        isOutsideRange={day => !(day.isSameOrBefore(moment(), 'day'))}
        displayFormat='YYYY-MM-DD'
          />
    )
  }
}
Login.propTypes = {
  onDatesChange: PropTypes.func.isRequired
}
