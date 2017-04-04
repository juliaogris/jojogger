import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'

import Login from './components/Login'
import Jogs from './components/Jogs'
import Weekly from './components/Weekly'

import { apiGetJogs } from './util/api'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      authError: null,
      loading: false,
      jogs: [],
      user: null
    }
    this.setLoading = this.setLoading.bind(this)
    this.handleAuthError = this.handleAuthError.bind(this)
    this.setUser = this.setUser.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  setLoading (loading) {
    this.setState({ loading, authError: null })
  }

  handleAuthError (authError) {
    this.setState({ authError, loading: false })
  }

  signOut () {
    this.setState({ user: null, jogs: {} })
  }

  async setUser (user) {
    this.setState({ user, loading: false })
    let jogs = await apiGetJogs(user)
    this.setState({ jogs })
  }

  // bypass auth during dev
  componentWillMount () {
    this.setUser({ email: 'j@x.co', password: '123456', id: '58e32eaacb5a3c8c34640d44' })
  }

  render () {
    const { user, loading, authError, jogs } = this.state
    if (loading) {
      return <h1>Loading</h1>
    }

    if (!user) {
      return (
        <div>
          {authError && <div className='error'>{authError.message}</div>}
          <Login
            setLoading={this.setLoading}
            handleAuthError={this.handleAuthError}
            setUser={this.setUser}
          />
        </div>
      )
    }

    console.log(`App.render user: ${JSON.stringify(user)}, loading: ${loading}, #jogs:${jogs.length}`)
    return (
      <Router>
        <div className='app'>
          <nav>
            <NavLink to='/jogs' activeClassName='active'>Jogs</NavLink>
            <NavLink to='/weekly' activeClassName='active'>Weekly</NavLink>
            <button onClick={() => { this.signOut() }}>Log out</button>
          </nav>
          <Switch>
            <Redirect exact from='/' to='/jogs' />
            <Route path='/jogs' render={(props) => <Jogs jogs={jogs} {...props} />} />
            <Route path='/weekly' render={(props) => <Weekly jogs={jogs} {...props} />} />
            <Route path='/weekly' render={(props) => <Weekly jogs={jogs} {...props} />} />
            <Redirect to='/jogs' />
          </Switch>
        </div>
      </Router>
    )
  }
}
