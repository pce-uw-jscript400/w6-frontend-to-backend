const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

    export const getAllUsers = async () => {
    const token = window.localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users`, {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        method: 'GET'
    })
    const json = await response.json()
    return json
}
  // const { NODE_ENV } = process.env
//     const BASE_URL = NODE_ENV === 'development'
//         ? 'http://localhost:5000'
//         : 'tbd' // Once we deploy, we need to change this

// export const getAllUsers = async () => {
//     const token = window.localStorage.getItem('journal-app')
//     const response = await fetch(`${BASE_URL}/api/users`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         method: 'GET'
//         })
//         const json = await response.json()
//         return json.response
// }

// import request from './request'

// export const fetchUsers = () => request('/api/users')