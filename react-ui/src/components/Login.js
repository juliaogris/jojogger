import React, { Component, PropTypes } from 'react'
import { apiLogin } from '../util/api'

export default class Login extends Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login (event) {
    event.preventDefault()
    const { setLoading, setUser, handleAuthError } = this.props
    setLoading(true)
    apiLogin(this.email.value, this.password.value)
      .then((user) => {
        console.log('user', user)
        setUser(user)
      })
      .catch((error) => {
        handleAuthError(error)
      })
  }

  signup (event) {
    event.preventDefault()
    // const {setLoading, handleAuthError} = this.props
    // setLoading(true)
    // firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value)
    //   .catch((error) => { handleAuthError(error) })
  }

  render () {
    return (
      <form className='login' action={this.login}>
        <input placeholder='email@example.com' type='email' ref={c => (this.email = c)} />
        <input placeholder='your password' type='password' ref={c => (this.password = c)} />
        <div className='button-row'>
          <button onClick={this.login}> Log in </button>
          <button onClick={this.signup}> Sign up </button>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  setLoading: PropTypes.func.isRequired,
  handleAuthError: PropTypes.func.isRequired
}
