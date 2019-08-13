
const { NODE_ENV } = process.env
  const BASE_URL = NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'tbd' // Once we deploy, we need to change this


    export const getAllUsers = async (user) => {
        const token = window.localStorage.getItem('journal-app')
        const response = await fetch(`${BASE_URL}/api/users`, {
          body: JSON.stringify(user),
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          method: 'GET'
        })
        const json = await response.json()
        const allUsers = json.response
        return allUsers
      }