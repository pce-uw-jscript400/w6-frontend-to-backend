import request from './request'
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

// export const createPost = ({ user, post }) => {
//     const path = `/api/users/${user._id}/posts`
//     const options = { body: post, method: 'POST' }
//     return request(path, options)
// }
export const createPost = async (user) => {
    const token = localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/${user.user._id}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user.post)
    })

    const json = await response.json()
    return json.response
}
    
// export const destroyPost = ({ user, post }) => {
//     const path = `/api/users/${user._id}/posts/${post._id}`
//     const options = { method: 'DELETE' }
//     return request(path, options)
// }
export const destroyPost = async (user) => {
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
    
// export const updatePost = ({ user, post }) => {
//     const path = `/api/users/${user._id}/posts/${post._id}`
//     const options = { body: post, method: 'PUT' }
//     return request(path, options)
// }
export const updatePost = async ({ user, post }) => {
    const token = localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/${user._id}/posts/${post._id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(post)
    })

    const json = await response.json()
    return json.response
}