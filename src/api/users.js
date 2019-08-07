const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const getAllUsers = async () => {
    const token = localStorage.getItem('journal-app')
    console.log(token)
    const response = await fetch(`${BASE_URL}/api/users`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'GET'
    })
    const json = await response.json()
    return json.response
}

