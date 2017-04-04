import React, { Component, PropTypes } from 'react'
import Row from '../components/Row'

import { groupBy } from '../util/funcs'
import moment from 'moment'

function addJogs (jogs, date) {
  const result = { date, distance: 0, duration: moment.duration(0) }
  for (let jog of jogs) {
    result.distance += jog.distance
    result.duration.add(moment.duration(jog.duration))
  }
  result.duration = moment.utc(result.duration.asMilliseconds()).format('hh:mm:ss')
  return result
}

function addJogsByWeek (jogs) {
  const weekly = groupBy(jogs, (jog) => moment(jog.date).startOf('isoWeek').format('YYYY-MM-DD'))
  for (let week in weekly) {
    weekly[week] = addJogs(weekly[week], week)
  }
  return weekly
}

export default class Weekly extends Component {
  render () {
    const { jogs } = this.props
    const weekly = addJogsByWeek(jogs)
    const weeklyKeys = Object.keys(weekly).sort().reverse()
    return (
      <div>
        <table>
          <thead>
            <tr className='weekly-head'>
              <td>Week</td>
              <td>Distance</td>
              <td>Duration</td>
              <td>Speed</td>
            </tr>
          </thead>
          <tbody>
            { weeklyKeys.map((weeklyKey) => <Row jog={weekly[weeklyKey]} key={weeklyKey} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

Weekly.propTypes = {
  jogs: PropTypes.array.isRequired
}
