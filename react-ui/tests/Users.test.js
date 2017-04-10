/* global it expect describe */
import React from 'react'
import ReactDOM from 'react-dom'
import Users from '../src/components/Users'
import UserForm from '../src/components/Users/UserForm'
import renderer from 'react-test-renderer'

const sampleUsers = [
  { 'email': 'admin@x.co', 'role': 'admin', 'id': 'id1' },
  { 'email': 'j@x.co', 'role': 'admin', 'id': 'id2' },
  { 'email': 'julia.ogris@gmail.com', 'role': 'regular', 'id': 'id3' },
  { 'email': 'manager@x.co', 'role': 'manager', 'id': 'id4' },
  { 'email': 'meetsshah@gmail.com', 'role': 'regular', 'id': 'id5' },
  { 'email': 'regular@x.co', 'role': 'regular', 'id': 'id6' }]

describe('Users', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Users
      setUsers={() => {}}
      authedUser={{}}
    />, div)
  })

  it('matches snapshot without ready users', () => {
    const tree = renderer.create(<Users
      setUsers={() => {}}
      authedUser={{}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot empty users', () => {
    const tree = renderer.create(<Users
      users={[]}
      setUsers={() => {}}
      authedUser={{}}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with users', () => {
    const tree = renderer.create(<Users
      setUsers={() => {}}
      authedUser={{}}
      users={sampleUsers}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with users for authed Admin', () => {
    const tree = renderer.create(<Users
      setUsers={() => {}}
      authedUser={{ role: 'admin' }}
      users={sampleUsers}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('UserForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UserForm
      onCancel={() => {}}
      authedRole='admin'
    />, div)
  })

  it('matches snapshot without user (add)', () => {
    const tree = renderer.create(<UserForm
      onCancel={() => {}}
      authedRole='admin'
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with user (edit)', () => {
    const tree = renderer.create(<UserForm
      user={{ email: 'user@x.co', role: 'regular' }}
      onCancel={() => {}}
      authedRole='admin'
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with user (edit) for Manager', () => {
    const tree = renderer.create(<UserForm
      user={{ email: 'user@x.co', role: 'regular' }}
      onCancel={() => {}}
      authedRole='manager'
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
