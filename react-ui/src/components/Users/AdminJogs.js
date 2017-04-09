import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'babel-polyfill'
import moment from 'moment'
import ErrorMessage from '../elements/ErrorMessage'
import JogsList from '../Jogs/JogsList'
import JogForm from '../Jogs/JogForm'
import { createJog, updateJog, deleteJog, getJogs } from '../../util/api'

export default class AdminJogs extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      view: 'list', // ['list', 'add', 'edit']
      editJog: null,
      error: null,
      jogs: [],
      jogsInRange: [],
      startDate: null,
      endDate: null
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.gotoList = this.gotoList.bind(this)
    this.handleUpdateJog = this.handleUpdateJog.bind(this)
    this.handleDeleteJog = this.handleDeleteJog.bind(this)
    this.handleCreateJog = this.handleCreateJog.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.fetchJogs = this.fetchJogs.bind(this)
  }

  componentWillMount () {
    this.mounted = true
    this.fetchJogs()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  async fetchJogs () {
    const { user, admin } = this.props
    this.setState({ loading: true })
    const jogs = await getJogs(user, admin)
    this.setState({ jogs, jogsInRange: jogs, loading: false, view: 'list', startDate: null, endDate: null })
  }

  handleDatesChange ({ startDate, endDate }) {
    const between = j => moment(j.date).isBetween(startDate, endDate, 'day', '[]')
    const jogsInRange = this.state.jogs.filter(between)
    this.setState({ startDate, endDate, jogsInRange })
  }

  handleEditClick (id) {
    const { jogs } = this.state
    const jog = jogs.find(jog => jog.id === id)
    const editJog = { ...jog }
    this.setState({ view: 'edit', editJog })
  }

  handleAddClick (event) {
    event.preventDefault()
    this.setState({ view: 'add' })
  }

  gotoList () {
    this.setState({ view: 'list' })
  }

  crudJog (jog, apiFunc) {
    this.setState({ loading: true })
    const { user, admin } = this.props
    apiFunc(user, jog, admin)
      .then(j => this.fetchJogs())
      .catch(error => {
        if (this.mounted) {
          this.setState({ error, loading: false })
        }
      })
  }

  handleUpdateJog (jog) {
    this.crudJog(jog, updateJog)
  }

  handleDeleteJog (jog) {
    this.crudJog(jog, deleteJog)
  }

  handleCreateJog (jog) {
    this.crudJog(jog, createJog)
  }

  render () {
    const { view, editJog, loading, error, jogs, startDate, endDate, jogsInRange } = this.state
    const { user, onCancel } = this.props
    if (loading || this.props.loading) {
      return <h1>Loading</h1>
    }
    if (error) {
      return <ErrorMessage error={error} onCancel={() => { this.setState({ error: null }) }} />
    }
    if (view === 'add') {
      return <JogForm
        createJog={this.handleCreateJog}
        onCancel={this.gotoList}
        heading={`User ${user.email}`} />
    }
    if (jogs.length === 0) {
      return (
        <div className='page'>
          <button onClick={onCancel} className='cancel-button'>×</button>
          <p className='info'>No jogs tracked for <strong>{user.email}</strong>. <br />
            <button onClick={() => { this.setState({ view: 'add' }) }}>
            Add one.
          </button>
          </p>
        </div>
      )
    }
    if (view === 'list') {
      return <JogsList
        onEdit={this.handleEditClick}
        onAddClick={this.handleAddClick}
        onDatesChange={this.handleDatesChange}
        jogs={jogsInRange}
        noJog={jogs.length === 0}
        heading={`User ${user.email}`}
        startDate={startDate}
        endDate={endDate}

        {...this.props} />
    }
    if (view === 'edit') {
      return <JogForm
        updateJog={this.handleUpdateJog}
        deleteJog={this.handleDeleteJog}
        onCancel={this.gotoList}
        jogs={jogs}
        jog={editJog}
        heading={`User ${user.email}`}
      />
    }
  }
}

AdminJogs.propTypes = {
  user: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
}
