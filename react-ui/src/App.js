/* global atob localStorage */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import moment from 'moment'

import Login from './components/Login'
import Jogs from './components/Jogs/'
import Weekly from './components/Weekly'

import { getJogs } from './util/api'

export default class App extends Component {
  constructor () {
    super()
    let user = localStorage.getItem('t')
    if (user) {
      user = JSON.parse(atob(user))
    }
    this.state = {
      authError: null,
      jogError: null,
      userError: null,
      loading: false,
      user,
      jogs: [],
      startDate: null,
      endDate: null,
      jogsInRange: [],
      loadingJogs: false
    }
    this.setLoading = this.setLoading.bind(this)
    this.handleAuthError = this.handleAuthError.bind(this)
    this.handleJogError = this.handleJogError.bind(this)
    this.handleUserError = this.handleUserError.bind(this)
    this.setUser = this.setUser.bind(this)
    this.fetchJogs = this.fetchJogs.bind(this)
    this.setJogs = this.setJogs.bind(this)
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

  handleJogError (jogError) {
    this.setState({ jogError })
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
    const { startDate, endDate, jogsInRange } = this.state
    const { user, jogError, loadingJogs } = this.state
    return (
      <Jogs
        startDate={startDate}
        endDate={endDate}
        jogs={jogsInRange}
        jogError={jogError}
        onDatesChange={this.handleDatesChange}
        setJogs={this.setJogs}
        handleJogError={this.handleJogError}
        user={user}
        loading={loadingJogs}
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
    const { user, loading, authError } = this.state
    if (loading) {
      return <h1>Signing you in.</h1>
    }

    if (!user) {
      return (
        <div>
          {authError && <div className='auth-error'>{authError.message}</div>}
          <Login
            setLoading={this.setLoading}
            handleAuthError={this.handleAuthError}
            setUser={this.setUser}
          />
        </div>
      )
    }

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
            <Route path='/jogs' render={this.renderJogs} />
            <Route path='/weekly' render={this.renderWeekly} />
            <Redirect to='/jogs' />
          </Switch>
        </div>
      </Router>
    )
  }
}
