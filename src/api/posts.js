const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const deletePost = async (userId, postId) => {
    const token = localStorage.getItem('journal-app')
    //get userId from token

    const response = await fetch(`${BASE_URL}/api/users/${userId}/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        method: 'DELETE'
    }) 
    const json = await response.json()
    return json.response
}