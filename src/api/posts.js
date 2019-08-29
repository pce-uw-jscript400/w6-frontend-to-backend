import request from './request'

// const { NODE_ENV } = process.env
// const BASE_URL = NODE_ENV === 'development'
//   ? 'http://localhost:5000'
//   : 'tbd' // Once we deploy, we need to change this

// export const deletePost = async (userId, postId) => {
//   const token = window.localStorage.getItem('journal-app')
//   const response = await fetch(`${BASE_URL}/api/users/${userId}/posts/${postId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     method: 'DELETE'
//   })
//   const json = await response.json()
//   console.log(json)
//   return json.response
// }

export const createPost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts`
  const options = { body: post, method: 'POST' }
  return request(path, options)
}

export const destroyPost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts/${post._id}`
  const options = { method: 'DELETE' }
  return request(path, options)
}

export const updatePost = ({ user, post }) => {
  const path = `/api/users/${user._id}/posts/${post._id}`
  const options = { body: post, method: 'PUT' }
  return request(path, options)
}