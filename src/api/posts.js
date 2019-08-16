const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this



  export const createPost = async ({ user, post }) => {
    const token = window.localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(post)
    })
    const json = await response.json()
    // console.log(json)
    return json.response

  }


export const deletePost = async ({ user, post }) => {
  const token = window.localStorage.getItem('journal-app')

  const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts/${post._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  })
  const json = await response.json()
  console.log(json)
  return json.response
}



export const updatePost = async ({ user, post }) => {
  console.log(user)
  console.log(post)
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts/${post._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body:JSON.stringify(post)
  })
  const json = await response.json()
  // console.log(json)
  return json.response

}
