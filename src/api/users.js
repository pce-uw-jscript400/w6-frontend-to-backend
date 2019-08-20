import request from './request'

export const updateUser = ({ user }) => {
    const path = `/api/users/${user._id}/edit`
    const options = { body: user, method: 'PUT' }
    return request(path, options)
  }
  
export const fetchUsers = () => request('/api/users')
