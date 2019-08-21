import request from './request'
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

export const deletePost = async (userId, post) => {
  const token = localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/users/${userId}/posts/${post._id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE'
  })
  const json = await response.json()

  return json
}

export const createPost = (userId, post) => {
  const path = `/api/users/${userId}/posts`
  const options = { body: post, method: 'POST' }
  return request(path, options)
}

export const updatePost = (userId, post) => {
  const path = `/api/users/${userId}/posts/${post._id}`
  const options = { body: post, method: 'PUT' }
  return request(path, options)
}