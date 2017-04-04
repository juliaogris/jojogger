/* global fetch btoa */

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

export function apiLogin (email, password) {
  return fetch('/api/login', {
    headers: {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    }
  })
  .then(handleErrors)
  .then(response => response.json())
  .then(user => {
    user.password = password
    return user
  })
}

export function apiGetJogs (user) {
  const { email, password, id } = user
  return fetch(`/api/users/${id}/jogs`, {
    headers: {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    }
  })
  .then(handleErrors)
  .then(response => response.json())
}
