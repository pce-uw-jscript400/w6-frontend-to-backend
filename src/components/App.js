import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as auth from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null,
      loading: true
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  //async loginUser (user) {
   // const response = await fetch('http://localhost:5000/api/login', {
   //   body: JSON.stringify(user),
   //   headers: {
   //     'Content-Type': 'application/json'
   // },
   //   method: 'POST',
   // })
   // const json = response.json()
   // console.log(json)
  //}
  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    console.log(`token = ${token}`)
    if (token) {
      const profile = await auth.profile()
      console.log(`profile = ${profile}`)
      if(profile.user){
      this.setState({ 
        currentUserId: profile.user._id,
        loading:false })
    }
  }
    this.setState({
      loading: false
    })
  }

  
  async loginUser (user) {
    const response = await auth.login(user)
    const profile = await auth.profile()
    
      this.setState({
        currentUserId:profile.user._id
      })
    
    console.log(response, profile)
  }

  //loginUser (user) {
  //  fetch('http://localhost:5000/api/login', {
  //    body: JSON.stringify(user),
  //    headers: {
  //      'Content-Type': 'application/json'
  //  },
  //    method: 'POST',
   // }).then(res => res.json()).then(console.log)
  //}

  async signupUser (user) {
    await auth.signin(user)
    const profile = await auth.profile()
    this.setState({
      currentUserId: profile.user._id
    })
  }

  logoutUser() {
    window.localStorage.removeItem('journal-app')
    this.setState({
      currentUserId: null
    })
    
  }

  render () {
    if(this.state.loading) return <p>Loading...</p>
    return (
      <Router>
        <Header />
        <Navigation 
          currentUserId={this.state.currentUserId} 
          logoutUser = {this.logoutUser}
          />
        <Switch>
          
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
            <Redirect to="/users"/>) :
            <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to="/users"/>) :
              <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return this.state.currentUserId ? <UsersContainer /> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
