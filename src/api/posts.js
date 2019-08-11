const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const createPost = async ({ user, post }) => {
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/${user._id}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  return json.response
}

export const updatePost = async ({ user, post }) => {
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/${user._id}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })
  const json = await response.json()

  return json.response
}

export const destroyPost = async (user, post) => {
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/${user._id}/posts/${post._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  })
  const json = await response.json()

  return json.response
}
