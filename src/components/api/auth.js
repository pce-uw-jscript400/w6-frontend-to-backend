const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  if (response.status === 200) {
    const json = await response.json()
    const token = json.token
    window.localStorage.setItem('journal-app', token)
    return json
  }
  const error = await response.json()
  return error
}

export const signup = async (user) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()
  const token = json.token

  window.localStorage.setItem('journal-app', token)
  return json
}

export const profile = async () => {
  const response = await fetch(`${BASE_URL}/api/profile`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('journal-app')}`
    }, 
    method: 'GET'
  })
  const json = await response.json()
  return json
}

export const logout = async () => {
  window.localStorage.removeItem('journal-app')
}