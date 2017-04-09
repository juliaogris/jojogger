/* global it expect beforeEach beforeAll fetch */
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'
import renderer from 'react-test-renderer'

beforeEach(() => {
  global.localStorage = { getItem: () => null }
})

beforeAll(() => {
  global.fetch = require('jest-fetch-mock')
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('renders "Login"', () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders "loading" with token', () => {
  const token = 'e30='
  global.localStorage = { getItem: () => token }
  fetch.mockResponse(JSON.stringify([]))
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
