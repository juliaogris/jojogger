/* global it expect jest */
import React from 'react'
import ReactDOM from 'react-dom'
import Settings from '../src/components/Settings'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-addons-test-utils'

jest.unmock('../src/util/api')
const api = require('../src/util/api')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Settings
    user={{ email: 'example@x.co' }}
    signOut={() => {}}
    />, div)
})

it('renders "Settings" and matches snapshot', () => {
  const tree = renderer.create(<Settings
    user={{ email: 'example@x.co' }}
    signOut={() => {}}
    />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('calls RestAPI.updateUser and signOut on submit click', () => {
  const signOut = jest.fn()
  const settings = ReactTestUtils.renderIntoDocument(<Settings
    user={{ email: 'example@x.co', id: 'myIdXyz' }}
    signOut={signOut}
  />)
  settings.setState({ email: 'j@x.co', password: 'pa$$word' })
  api.updateUser = jest.fn(() => ({
    then: (func) => {
      func()
      return { catch: () => {} }
    }
  }))
  settings.handleSubmit()
  expect(signOut).toHaveBeenCalledTimes(1)
  expect(api.updateUser).toHaveBeenCalledTimes(1)
  expect(api.updateUser).toHaveBeenCalledWith(
    { email: 'example@x.co', id: 'myIdXyz' },
    { email: 'j@x.co', password: 'pa$$word', id: 'myIdXyz' })
})

it('delete Account with prior confirmation prompt', () => {
  const signOut = jest.fn()
  const user = { email: 'example@x.co', id: 'myIdXyz' }
  const settings = ReactTestUtils.renderIntoDocument(<Settings
    user={user}
    signOut={signOut}
  />)
  let buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(settings, 'span')
  expect(buttons.length).toEqual(1)
  const deleteButton = buttons[0]
  ReactTestUtils.Simulate.click(deleteButton)
  expect(settings.state.deleteConfirm).toBeTruthy()
  buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(settings, 'button')
  expect(buttons.length).toEqual(2)

  const yesButton = buttons[1]
  api.deleteUser = jest.fn(() => ({
    then: (func) => {
      func()
      return { catch: () => {} }
    }
  }))
  ReactTestUtils.Simulate.click(yesButton)
  expect(signOut).toHaveBeenCalledTimes(1)
  expect(api.deleteUser).toHaveBeenCalledTimes(1)
  expect(api.deleteUser).toHaveBeenCalledWith(user, user)
})
