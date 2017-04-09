/* global atob localStorage */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import moment from 'moment'

import Login from './components/Login'
import Jogs from './components/Jogs/'
import Weekly from './components/Weekly'
import Settings from './components/Settings'
import Users from './components/Users/'

import { getJogs } from './util/api'
import Cog from './svgs/Cog'

export default class App extends Component {
  constructor () {
    super()
    let user = localStorage.getItem('t')
    if (user) {
      user = JSON.parse(atob(user))
    }
    this.state = {
      authError: null,
      userError: null,
      loading: false,
      user,
      jogs: [],
      startDate: null,
      endDate: null,
      jogsInRange: [],
      loadingJogs: false,
      users: []
    }
    this.setLoading = this.setLoading.bind(this)
    this.handleAuthError = this.handleAuthError.bind(this)
    this.handleUserError = this.handleUserError.bind(this)
    this.setUser = this.setUser.bind(this)
    this.fetchJogs = this.fetchJogs.bind(this)
    this.setJogs = this.setJogs.bind(this)
    this.setUsers = this.setUsers.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.renderJogs = this.renderJogs.bind(this)
    this.renderWeekly = this.renderWeekly.bind(this)
  }

  setLoading (loading) {
    this.setState({ loading, authError: null })
  }

  handleAuthError (authError) {
    this.setState({ authError, loading: false })
  }

  handleUserError (userError) {
    this.setState({ userError })
  }

  signOut () {
    this.setState({
      user: null,
      jogs: [],
      jogsInRange: [],
      startDate: null,
      endDate: null
    })
    localStorage.removeItem('t')
  }

  async fetchJogs (user) {
    if (!user) {
      return
    }
    this.setState({ loadingJogs: true })
    this.setJogs(await getJogs(user))
    this.setState({ loadingJogs: false })
  }

  setUsers (users) {
    this.setState({ users })
  }

  setJogs (jogs) {
    let startDate = null
    let endDate = null
    if (jogs.length > 0) {
      const compareJogs = (a, b) =>
        (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)
      jogs.sort(compareJogs)
      endDate = moment(jogs[0].date)
      startDate = moment(jogs[jogs.length - 1].date)
    }
    this.setState({ startDate, endDate, jogs, jogsInRange: jogs })
  }

  setUser (user) {
    this.setState({ user, loading: false })
    this.fetchJogs(user)
  }

  handleDatesChange ({ startDate, endDate }) {
    const between = j => moment(j.date).isBetween(startDate, endDate, 'day', '[]')
    const jogsInRange = this.state.jogs.filter(between)
    this.setState({ startDate, endDate, jogsInRange })
  }

  componentWillMount () {
    this.fetchJogs(this.state.user)
  }

  renderJogs (props) {
    const { startDate, endDate, jogsInRange, jogs } = this.state
    const { user, loadingJogs } = this.state
    return (
      <Jogs
        startDate={startDate}
        endDate={endDate}
        jogs={jogsInRange}
        onDatesChange={this.handleDatesChange}
        setJogs={this.setJogs}
        user={user}
        loading={loadingJogs}
        noJogs={jogs.length === 0}
        {...props}
      />
    )
  }

  renderWeekly (props) {
    const { startDate, endDate, jogsInRange } = this.state
    return (
      <Weekly
        startDate={startDate}
        endDate={endDate}
        jogs={jogsInRange}
        onDatesChange={this.handleDatesChange}
        {...props}
      />
    )
  }

  render () {
    const { user, loading, authError, users } = this.state
    if (loading) {
      return <h1>Signing in...</h1>
    }

    if (!user) {
      return (
        <div>
          <Login
            setLoading={this.setLoading}
            handleAuthError={this.handleAuthError}
            authError={authError}
            setUser={this.setUser}
          />
        </div>
      )
    }
    const UsersRoute = () => {
      if (user.role !== 'regular') {
        return (
          <Route
            path='/users'
            render={() => <Users authedUser={user} setUsers={this.setUsers} users={users} />}
          />)
      }
      return <Redirect to='/jogs' />
    }
    return (
      <Router>
        <div className='app'>
          <nav>
            <NavLink to='/settings' activeClassName='active' className='settings'><Cog color='#777' /></NavLink>
            <NavLink to='/jogs' activeClassName='active'>Jogs</NavLink>
            <NavLink to='/weekly' activeClassName='active'>Weekly</NavLink>
            {user.role !== 'regular' &&
              <NavLink to='/users' activeClassName='active'>Users</NavLink>}
            <button className='signout' onClick={() => { this.signOut() }}>Log out</button>
          </nav>
          <Switch>
            <Redirect exact from='/' to='/jogs' />
            <Route path='/settings' render={() => <Settings user={user} signOut={this.signOut} />} />
            <Route path='/jogs' render={this.renderJogs} />
            <Route path='/weekly' render={this.renderWeekly} />
            <UsersRoute />
            <Redirect to='/jogs' />
          </Switch>
        </div>
      </Router>
    )
  }
}
