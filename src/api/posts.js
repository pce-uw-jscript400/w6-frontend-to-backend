const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

  export const destroyPost = async (user, post) => {
      const token = localStorage.getItem('journal-app')
      const response = await fetch(`${BASE_URL}/api/users/${user.user._id}/posts/${user.post._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      const json = await response.json()
      return json.response
  }

  export const createPost = async (user, post) => {
    const token = localStorage.getItem('journal-app')
    console.log('post: ' + post) // this is undefined
    const response = await fetch(`${BASE_URL}/api/users/${user.user._id}/posts`, {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(post)
    })

    const json = await response.json()
    console.log(json.response)
    return json.response
}

export const updatePost = async ({ user, post }) => {
    const token = localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/${user.user._id}/posts/${user.post._id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(post)
    })


    const json = await response.json()
    return json.response
}