import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from 'react-router-dom'
import firebase from 'firebase'
// import fetch from 'unfetch'

import Login from './components/Login'
import Runs from './components/Runs'
import Weekly from './components/Weekly'

import sampleRuns from './sample_runs'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      authed: false,
      authError: null,
      loading: true,
      runs: null
    }
    this.setLoading = this.setLoading.bind(this)
    this.handleAuthError = this.handleAuthError.bind(this)
    this.getRuns = this.getRuns.bind(this)
  }

  getRuns (uid) {
    return sampleRuns
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged(
      async (user) => {
        this.setState({ loading: true })
        if (user) {
          let runs = await this.getRuns(user.uid)
          console.log('runs:', runs)
          this.setState({ runs, authed: true, loading: false })
        } else {
          this.setState({ authed: false, loading: false })
        }
      })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  setLoading (loading) {
    this.setState({loading, authError: null})
  }

  handleAuthError (authError) {
    this.setState({authError, loading: false})
  }

  render () {
    const {authed, loading, authError, runs} = this.state
    if (loading) {
      return <h1>Loading</h1>
    }

    if (!authed) {
      return (
        <div>
          {authError && <div className='error'>{authError.message}</div>}
          <Login setLoading={this.setLoading} handleAuthError={this.handleAuthError} />
        </div>
      )
    }

    console.log(`authed: ${authed}, loading: ${loading}, runs:${runs}`)
    return (
      <Router>
        <div className='app'>
          <nav>
            <NavLink to='/runs' activeClassName='active'>Runs</NavLink>
            <NavLink to='/weekly' activeClassName='active'>Weekly</NavLink>
            <button onClick={() => { firebase.auth().signOut() }}>Log out</button>
          </nav>
          <Switch>
            <Redirect exact from='/' to='/runs' />
            <Route path='/runs' render={(props) => <Runs runs={runs} {...props} />} />
            <Route path='/weekly' render={(props) => <Weekly runs={runs} {...props} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

// Replace with your firebase config from
// https://console.firebase.google.com/project/<your_poject_id>
firebase.initializeApp({
  apiKey: 'AIzaSyBAb4AQG4jxyR_YmUz3pm0wqC9SVnpa2lw',
  authDomain: 'routing-bddc6.firebaseapp.com',
  databaseURL: 'https://routing-bddc6.firebaseio.com'
})
