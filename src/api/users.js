import request from './request'
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

export const getUsers = async () => {
  const token = localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
      method: 'GET'
    })

  const json = await response.json()

  return json.response
}

export const updateUserName = (userId, username) => {
  const path = `/api/users/${userId}`
  const options = { body: { username }, method: 'PUT' }
  return request(path, options)
}