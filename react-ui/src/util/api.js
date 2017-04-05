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

const opts = (token, method) => ({
  headers: {
    'Authorization': 'Basic ' + token,
    'Content-Type': 'application/json'
  },
  method: method || 'GET'
})

export function login (email, password) {
  const token = btoa(`${email}:${password}`)
  return fetch('/api/login', opts(token))
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
  .then(handleErrors)
  .then(response => response.json())
  .then(({ uid }) => {
    const user = { token, id: uid }
    localStorage.setItem('t', btoa(JSON.stringify(user)))
    return user
  })
}

export function getJobs (user) {
  const { token, id } = user
  return fetch(`/api/users/${id}/jogs`, opts(token, 'GET'))
  .then(handleErrors)
  .then(response => response.json())
}
