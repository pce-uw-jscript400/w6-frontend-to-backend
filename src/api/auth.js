

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
  const json = await response.json()
  const token = json.token

  window.localStorage.setItem('journal-app', token)
  return json
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
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  const json = await response.json()

  return json
}

