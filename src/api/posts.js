// const { NODE_ENV } = process.env
// const BASE_URL = NODE_ENV === 'development' ?
//     'http://localhost:5000' :
//     'tbd' // Once we deploy, we need to change this
const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN

export const remove = async(user, post) => {
    const token = window.localStorage.getItem('journal-app')
    console.log(user, post)
    const postId = post
    const userId = user
    const response = await fetch(`${BASE_URL}/api/users/${userId}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    const json = await response.json()
    const responseUser = json.response

    return responseUser
}