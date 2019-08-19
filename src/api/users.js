import request from './request'

export const fetchUsers = () => request('/api/users')

export const updateUsername = ({ user, name }) => {
    const path = `/api/users/${user._id}/edit`
    //console.log(`ALYLOG:${JSON.stringify(name)}`)
    const options = { body:{'name': name}, method: 'PUT' }
    return request(path, options)
  }