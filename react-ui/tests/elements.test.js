/* global it expect jest describe */
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-addons-test-utils'
import AddButton from '../src/components/elements/AddButton'
import DeleteButton from '../src/components/elements/DeleteButton'
import EditButton from '../src/components/elements/EditButton'
import TickButton from '../src/components/elements/TickButton'
import JogsButton from '../src/components/elements/JogsButton'
import ErrorMessage from '../src/components/elements/ErrorMessage'

class Wrapper extends React.Component {
  render () {
    return this.props.children
  }
}

describe('AddButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddButton onClick={() => {}} />, div)
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<AddButton onClick={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls "onClick()" on simulated click', () => {
    const onClick = jest.fn()
    const addButton = ReactTestUtils.renderIntoDocument(<Wrapper><AddButton onClick={onClick} /></Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(addButton, 'button')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('DeleteButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DeleteButton show onClick={() => {}} item='MyItem' />, div)
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<DeleteButton show onClick={() => {}} item='MyItem' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('is null when show is set to false', () => {
    const tree = renderer.create(<DeleteButton show={false} onClick={() => {}} item='MyItem' />).toJSON()
    expect(tree).toBeNull()
  })
  it('calls "onClick()" on simulated click', () => {
    const onClick = jest.fn()
    const deleteButton = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <DeleteButton show onClick={onClick} item='MyItem' />
      </Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(deleteButton, 'span')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('EditButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<EditButton onEdit={() => {}} id={1} />, div)
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<EditButton onEdit={() => {}} id={1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls "onEdit()" on simulated click', () => {
    const onEdit = jest.fn()
    const editButton = ReactTestUtils.renderIntoDocument(<Wrapper><EditButton onEdit={onEdit} id={1} /></Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(editButton, 'button')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(1)
  })
})

describe('JogsButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<JogsButton onJogsClick={() => {}} />, div)
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<JogsButton onJogsClick={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls "onJogsClick()" on simulated click', () => {
    const onJogsClick = jest.fn()
    const jogsButton = ReactTestUtils.renderIntoDocument(<Wrapper><JogsButton onJogsClick={onJogsClick} /></Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(jogsButton, 'button')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onJogsClick).toHaveBeenCalledTimes(1)
  })
})

describe('TickButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TickButton onClick={() => {}} />, div)
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<TickButton onClick={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls "onClick()" on simulated click', () => {
    const onClick = jest.fn()
    const tickButton = ReactTestUtils.renderIntoDocument(<Wrapper><TickButton onClick={onClick} /></Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(tickButton, 'button')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('ErrorMessage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ErrorMessage onCancel={() => {}} error={{ message: 'My Error' }} />, div)
  })
  it('matches snapshot', () => {
    const errorMessage = <ErrorMessage onCancel={() => {}} error={{ message: 'My Error' }} />
    const tree = renderer.create(errorMessage).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('is null when error is null', () => {
    const tree = renderer.create(<DeleteButton show={false} onClick={() => {}} />).toJSON()
    expect(tree).toBeNull()
  })

  it('calls "onCancel()" on simulated click', () => {
    const onCancel = jest.fn()
    const errorMessage = ReactTestUtils.renderIntoDocument(
      <Wrapper>
        <ErrorMessage onCancel={onCancel} error={{ message: 'My Error' }} />
      </Wrapper>)
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(errorMessage, 'button')
    expect(buttons.length).toEqual(1)
    const button = buttons[0]
    ReactTestUtils.Simulate.click(button)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
