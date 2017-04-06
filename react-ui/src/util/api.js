/* global fetch btoa localStorage */

function handleErrors (response) {
  if (response.status === 401) {
    throw Error('Invalid username or password.')
  }
  if (!response.ok) {
    console.error('Internal Error', response.status, response.statusText)
    response.json().then(c => console.error(JSON.stringify(c)))
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
  .then(({ id, role }) => {
    const user = { token, id, role, email }
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
    const user = { token, id: uid, email, role: 'regular' }
    localStorage.setItem('t', btoa(JSON.stringify(user)))
    return user
  })
}

export function getJogs (user, admin) {
  const token = admin ? admin.token : user.token
  const { id } = user
  return fetch(`/api/users/${id}/jogs`, Opts(token, 'GET'))
  .then(handleErrors)
  .then(response => response.json())
}

export function createJog (user, jog, admin) {
  const token = admin ? admin.token : user.token
  const { id } = user
  const opts = Opts(token, 'POST', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/`, opts)
  .then(handleErrors)
  .then(response => response.json())
  .then(json => json.data)
}

export function updateJog (user, jog, admin) {
  const token = admin ? admin.token : user.token
  const { id } = user
  const opts = Opts(token, 'PUT', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/${jog.id}`, opts)
  .then(handleErrors)
}

export function deleteJog (user, jog, admin) {
  const token = admin ? admin.token : user.token
  const { id } = user
  const opts = Opts(token, 'DELETE', JSON.stringify(jog))
  return fetch(`/api/users/${id}/jogs/${jog.id}`, opts)
  .then(handleErrors)
}

export function getUsers (amdin) {
  const { token } = amdin
  return fetch(`/api/users/`, Opts(token, 'GET'))
  .then(handleErrors)
  .then(response => response.json())
}

export function createUser (admin, user) {
  const { token } = admin
  return fetch(`/api/users/`, Opts(token, 'POST', JSON.stringify(user)))
  .then(handleErrors)
  .then(response => response.json())
}

export function updateUser (admin, user) {
  const { token } = admin
  const opts = Opts(token, 'PUT', JSON.stringify(user))
  return fetch(`/api/users/${user.id}`, opts)
  .then(handleErrors)
  .then(response => response.json())
}

export function deleteUser (admin, user) {
  const { token } = admin
  const opts = Opts(token, 'DELETE', JSON.stringify(user))
  return fetch(`/api/users/${user.id}`, opts)
  .then(handleErrors)
  .then(response => response.json())
}
