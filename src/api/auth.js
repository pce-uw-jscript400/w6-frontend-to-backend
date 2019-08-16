import { withRouter } from 'react-router'

// const { NODE_ENV } = process.env
// const BASE_URL = NODE_ENV === 'development'
//   ? 'http://localhost:5000'
//   : 'tbd' // Once we deploy, we need to change this

const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN



export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  if(json.status === 200){
    window.localStorage.setItem('journal-app', json.token);
    console.log(`FROM AUTH FILE`)
  }


  return json
}


export const profile = async () => {

  const mylocaltoken = window.localStorage.getItem('journal-app');

  const response = await fetch(`${BASE_URL}/api/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mylocaltoken}`
    },
    method: 'GET'
  })

  const json = response.json()

  return json

}


export const signup = async (user) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()

  if(json.status === 201){
      //Storing token to a local storage called 'journal-app'
    window.localStorage.setItem('journal-app', json.token);
  }


  // window.localStorage.setItem('journal-app', json.token);
  // console.log(`FROM AUTH FILE`)
  // console.log(json)
  return json
}
