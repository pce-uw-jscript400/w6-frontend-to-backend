import request from './request'

//why this syntax for ({user, post})?

export const destroyPost = ({user, post}) => {
    const path = `/api/users/${user._id}/posts/${post._id}`
    const options = { method: 'DELETE' }
    return request(path, options)
}

export const createPost = ({user, post}) => {
    const path = `/api/users/${user._id}/posts`
    const options = { method: 'POST '}
    return request(path, options)
}

export const updatePost = ({user, post}) => {
    const path = `/api/users/${user._id}/posts/${post._id}`
    const options = { method: 'PUT' }
    return request(path, options)
}