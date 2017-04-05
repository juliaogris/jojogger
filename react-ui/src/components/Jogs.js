import React, { Component, PropTypes } from 'react'
import JogsList from './JogsList'

export default class Jogs extends Component {
  constructor () {
    super()
    this.state = {
      view: 'list' // ['list', 'add', 'edit']
    }
    this.hadnleEdit = this.hadnleEdit.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  hadnleEdit (jogId) {
    console.log('Jogs.hadnleEdit', jogId)
    this.setState({ view: 'edit' })
  }

  handleAddClick (event) {
    console.log('Jogs.handleAddClick')
    event.preventDefault()
    this.setState({ view: 'add' })
  }

  render () {
    const { view } = this.state
    if (view === 'list') {
      return <JogsList onEdit={this.hadnleEdit} onAddClick={this.handleAddClick} {...this.props} />
    }
    if (view === 'add') {
      return <div>Add new Jog</div>
    }
    return <div>Edit JOG</div>
  }
}

Jogs.propTypes = {
  onDatesChange: PropTypes.func.isRequired,
  jogs: PropTypes.array.isRequired
}
