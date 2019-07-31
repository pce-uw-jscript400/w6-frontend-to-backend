const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()
  localStorage.setItem('journal-app', json.token);
  return json
}

export const profile = async () => {
    const token = localStorage.getItem('journal-app')
    console.log(token)
    const response = await fetch(`${BASE_URL}/api/profile`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        method: 'GET'
    })
    const json = response.json()
    return json
}

export const signup = async () => {
    const response = await fetch(`${BASE_URL}/api/signup`, {
    
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
}