/* global it expect jest */
import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../src/components/Login'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-addons-test-utils'

jest.unmock('../src/util/api')
const api = require('../src/util/api')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login
    setLoading={() => {}}
    handleAuthError={() => {}}
    />, div)
})

it('renders "Login" and matches snapshot', () => {
  const tree = renderer.create(<Login
    setLoading={() => {}}
    handleAuthError={() => {}}
    />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('calls RestAPI login on simulated Login Click', () => {
  const login = ReactTestUtils.renderIntoDocument(<Login
    setLoading={() => {}}
    handleAuthError={() => {}} />)
  login.setState({ email: 'j@x.co', password: 'pa$$word' })
  api.login = jest.fn(() => ({
    then: () => ({
      catch: () => {}
    })
  }))
  login.handleLoginClick({ preventDefault: () => {} })
  expect(api.login).toHaveBeenCalledWith('j@x.co', 'pa$$word')
})

it('calls RestAPI signup on simulated Signup Click', () => {
  const login = ReactTestUtils.renderIntoDocument(<Login
    setLoading={() => {}}
    handleAuthError={() => {}} />)
  login.setState({ email: 'j@x.co', password: 'pa$$word' })
  api.signup = jest.fn(() => ({
    then: () => ({
      catch: () => {}
    })
  }))
  login.handleSignupClick({ preventDefault: () => {} })
  expect(api.signup).toHaveBeenCalledWith('j@x.co', 'pa$$word')
})
