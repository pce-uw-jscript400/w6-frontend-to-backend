const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const deletePost = async (user, post) => {
  const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts/${post._id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('journal-app')}`
    },
    method: 'DELETE'
  })
  const json = await response.json()
  return json.response
}

export const createPost = async (user, post) => {
  const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts/new`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('journal-app')}`
    },
    method: 'POST',
    body: JSON.stringify(post)
  })
  const json = await response.json()
  return json.response
}