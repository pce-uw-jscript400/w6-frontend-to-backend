
const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this


export const getOneUser = async () => {

  const mylocaltoken = window.localStorage.getItem('journal-app');

  const response = await fetch(`${BASE_URL}/api/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })

  const json = await response.json()
  return json.response

}



export const updateUser = async ({ user, post }) => {
  console.log(user)
  // console.log(post)
  const token = window.localStorage.getItem('journal-app')
  const response = await fetch(`${BASE_URL}/api/users/${user._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body:JSON.stringify({name: user.name})
  })
  const json = await response.json()
  // console.log(json)
  return json.response

}
