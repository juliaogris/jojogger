/* global it expect describe */
import React from 'react'
import ReactDOM from 'react-dom'
import Jogs from '../src/components/Jogs'
import JogForm from '../src/components/Jogs/JogForm'
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

describe('Jogs', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Jogs
      onDatesChange={() => {}}
      setJogs={() => {}}
      jogs={[]}
      noJogs={false}
      user={{}}
    />, div)
  })

  it('renders "Jogs" and matches snapshot without filtered jogs', () => {
    const tree = renderer.create(<Jogs
      onDatesChange={() => {}}
      setJogs={() => {}}
      jogs={[]}
      noJogs={false}
      user={{}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders "Jogs" and matches snapshot with sample jogs', () => {
    const tree = renderer.create(<Jogs
      onDatesChange={() => {}}
      setJogs={() => {}}
      jogs={sampleJogs}
      noJogs={false}
      user={{}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders "Jogs" and matches snapshot without jogs', () => {
    const tree = renderer.create(<Jogs
      onDatesChange={() => {}}
      setJogs={() => {}}
      jogs={[]}
      noJogs
      user={{}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('JogForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<JogForm
      onCancel={() => {}}
    />, div)
  })

  it('renders "Jogs" and matches snapshot without jog', () => {
    const tree = renderer.create(<JogForm
      onCancel={() => {}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders "Jogs" and matches snapshot with jog', () => {
    const tree = renderer.create(<JogForm
      jog={{ duration: '01:34:00', date: '2016-12-18', distance: '12.3' }}
      onCancel={() => {}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
