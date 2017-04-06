/* global fetch btoa localStorage */

function handleErrors (response) {
  if (response.status === 401) {
    throw Error('Invalid username or password.')
  }
  if (!response.ok) {
    console.error('Internal Error', response.status, response.statusText)
    throw Error('We are sorry, something went wrong.')
  }
  return response
}

const Opts = (token, method, body) => ({
  headers: {
    'Authorization': 'Basic ' + token,
    'Content-Type': 'application/json'
  },
  method: method || 'GET',
  body
})

export function login (email, password) {
  const token = btoa(`${email}:${password}`)
  return fetch('/api/login', Opts(token))
  .then(handleErrors)
  .then(response => response.json())
  .then(({ id }) => {
    const user = { token, id }
    localStorage.setItem('t', btoa(JSON.stringify(user)))
    return user
  })
}

export function signup (email, password) {
  const token = btoa(`${email}:${password}`)
  return fetch('/api/users', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (response.status === 400) {
      throw Error('Email address already registered.')
    }
    return response
  })
  .then(handleErrors)
  .then(response => response.json())
  .then(({ uid }) => {
    const user = { token, id: uid }
    localStorage.setItem('t', btoa(JSON.stringify(user)))
    return user
  })
}

export function getJogs (user) {
  const { token, id } = user
  return fetch(`/api/users/${id}/jogs`, Opts(token, 'GET'))
  .then(handleErrors)
  .then(response => response.json())
}

export function createJog (user, jog) {
  const { token, id } = user
  const opts = Opts(token, 'POST', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/`, opts)
  .then(handleErrors)
  .then(response => response.json())
  .then(json => json.data)
}

export function updateJog (user, jog) {
  const { token, id } = user
  const opts = Opts(token, 'PUT', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/${jog.id}`, opts)
  .then(handleErrors)
}

export function deleteJog (user, jog) {
  const { token, id } = user
  const opts = Opts(token, 'DELETE', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/${jog.id}`, opts)
  .then(handleErrors)
}

export function getUsers (user) {
  const { token } = user
  return fetch(`/api/users/`, Opts(token, 'GET'))
  .then(handleErrors)
  .then(response => response.json())
}

export function createUser (user, newUser) {
  const { token } = user
  return fetch(`/api/users/`, Opts(token, 'POST', JSON.stringify(newUser)))
  .then(handleErrors)
  .then(response => response.json())
}

export function updateUser (user, updatedUser) {
  const { token } = user
  const opts = Opts(token, 'PUT', JSON.stringify(updatedUser))
  return fetch(`/api/users/${updatedUser.id}`, opts)
  .then(handleErrors)
  .then(response => response.json())
}

export function deleteUser (user, deletedUser) {
  const { token } = user
  const opts = Opts(token, 'DELETE', JSON.stringify(deletedUser))
  return fetch(`/api/users/${deletedUser.id}`, opts)
  .then(handleErrors)
  .then(response => response.json())
}
