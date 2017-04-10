/* global it expect jest */
import React from 'react'
import ReactDOM from 'react-dom'
import Weekly from '../src/components/Weekly'
import renderer from 'react-test-renderer'

const sampleJogs = [
  { 'date': '2017-04-09', 'duration': '01:00:00', 'distance': 12.13, 'id': 'id100' },
  { 'date': '2017-04-08', 'duration': '01:00:00', 'distance': 11.5, 'id': 'id200' },
  { 'date': '2017-04-07', 'duration': '01:00:04', 'distance': 12, 'id': 'id1' },
  { 'date': '2017-04-06', 'duration': '01:00:00', 'distance': 10, 'id': 'id2' },
  { 'date': '2017-04-06', 'duration': '01:00:00', 'distance': 10, 'id': 'id3' },
  { 'date': '2017-04-06', 'duration': '01:00:00', 'distance': 10, 'id': 'id4' },
  { 'date': '2017-04-05', 'duration': '00:20:01', 'distance': 3.1, 'id': 'id5' },
  { 'date': '2017-04-05', 'duration': '01:32:00', 'distance': 6, 'id': 'id6' },
  { 'date': '2017-04-03', 'duration': '00:10:00', 'distance': 6, 'id': 'id7' },
  { 'date': '2017-04-02', 'duration': '01:00:00', 'distance': 10, 'id': 'id8' },
  { 'date': '2017-03-31', 'duration': '01:00:00', 'distance': 10, 'id': 'id9' }]

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Weekly
    onDatesChange={() => {}}
    jogs={[]}
    />, div)
})

it('renders "Weekly" and matches snapshot for no jogs', () => {
  const tree = renderer.create(<Weekly
    onDatesChange={() => {}}
    jogs={[]}
    />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders "Weekly" and matches snapshot for sample jogs', () => {
  const tree = renderer.create(<Weekly
    onDatesChange={() => {}}
    jogs={sampleJogs}
    />).toJSON()
  expect(tree).toMatchSnapshot()
})
