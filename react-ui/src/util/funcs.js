import * as moment from 'moment'

export function getSpeed (timeStr, distanceKm) {
  const hours = moment.duration(timeStr).asHours()
  return distanceKm / hours
}

export function groupBy (xs, key) {
  return xs.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key]
    rv[v] = rv[v] || []
    rv[v].push(x)
    return rv
  }, {})
}
