import React, { Component, PropTypes } from 'react'
import Row from '../components/Row'

import {groupBy} from '../helpers'
import moment from 'moment'

function addRuns (runs, date) {
  const result = {date, distance: 0, time: moment.duration(0)}
  for (let run of runs) {
    result.distance += run.distance
    result.time.add(moment.duration(run.time))
  }
  result.time = moment.utc(result.time.asMilliseconds()).format('hh:mm:ss')
  return result
}

function addRunsByWeek (runs) {
  const weekly = groupBy(runs, (run) => moment(run.date).startOf('isoWeek').format('YYYY-MM-DD'))
  for (let week in weekly) {
    weekly[week] = addRuns(weekly[week], week)
  }
  return weekly
}

export default class Weekly extends Component {

  render () {
    const runs = Object.values(this.props.runs)
    const weekly = addRunsByWeek(runs)
    const weeklyKeys = Object.keys(weekly).sort()
    return (
      <div>
        <table>
          <thead>
            <tr className='weekly-head'>
              <td>Week</td>
              <td>Distance</td>
              <td>Time</td>
              <td>Speed</td>
            </tr>
          </thead>
          <tbody>
            { weeklyKeys.map((weeklyKey) => <Row run={weekly[weeklyKey]} key={weeklyKey} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

Weekly.propTypes = {
  runs: PropTypes.object.isRequired
}
