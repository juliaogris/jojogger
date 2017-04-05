import React, { Component, PropTypes } from 'react'
import JogsList from './JogsList'
import JogForm from './JogForm'

export default class Jogs extends Component {
  constructor () {
    super()
    this.state = {
      view: 'list', // ['list', 'add', 'edit']
      editJog: null
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleFormCancel = this.handleFormCancel.bind(this)
  }

  handleEdit (id) {
    console.log('Jogs.handleEdit', id)
    const { jogs } = this.props
    const jog = jogs.find(jog => jog.id === id)
    this.setState({ view: 'edit', editJog: jog })
  }

  handleAddClick (event) {
    console.log('Jogs.handleAddClick')
    event.preventDefault()
    this.setState({ view: 'add' })
  }

  handleFormCancel (event) {
    event.preventDefault()
    this.setState({ view: 'list' })
  }
  render () {
    const { view, editJog } = this.state
    const { setJogs } = this.props
    if (view === 'list') {
      return <JogsList onEdit={this.handleEdit} onAddClick={this.handleAddClick} {...this.props} />
    }
    if (view === 'add') {
      return <JogForm updateJog={false} onCancel={this.handleFormCancel} setJogs={setJogs} />
    }
    return <JogForm updateJog jog={editJog} onCancel={this.handleFormCancel} setJogs={setJogs} />
  }
}

Jogs.propTypes = {
  onDatesChange: PropTypes.func.isRequired,
  setJogs: PropTypes.func.isRequired,
  jogs: PropTypes.array.isRequired
}
