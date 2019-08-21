const { NODE_ENV } = process.env
  const BASE_URL = NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'tbd' // Once we deploy, we need to change this

export const users = async () => {
    const token = window.localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      method: 'GET'
    })
    const json = await response.json()
    return json.response;
  }

  export const update = async (newName, userId) => {
   console.log(userId)
    const token = window.localStorage.getItem('journal-app')
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      body: JSON.stringify({name: newName}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      method: 'PUT'
    })
    const json = await response.json()
    if(json.status === 200)
    {
      const token = json.token;
      window.localStorage.setItem('journal-app', token)
    }
    return json
  }