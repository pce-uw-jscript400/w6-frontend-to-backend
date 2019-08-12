import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

import * as auth from '../api/auth.js'
import { async } from 'q';

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.loginUser.bind(this)
  }

  // Sets User logged in and sets state
  async componentDidMount(){
    const token = window.localStorage.getItem('journal-app')
    if(token) {
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id })
    }
  }
  async loginUser (user) {
    // Code imports login and profile from FrontEnd/src/api/auth.js exported functions
    const response = await auth.login(user)
    const profile = await auth.profile()

    console.log(profile)

    this.setState({ currentUserId: profile.user._id })

    // Non Asynchronous no async
    // fetch('http://localhost:5000/api/login', {
    //   body: JSON.stringify(user),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    // }).then(res => res.json()).then(console.log)

    // Asynchronous
    // const response = await fetch('http://localhost:5000/api/login', {
    //   body: JSON.stringify(user),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    // })
    // const json = await response.json()
    // console.log(json)
  }
  async logoutUser () {
    window.localStorage.removeItem('journal-app')
    this.setState({ currentUserId: null })
    // history.push('/login')
  }
  signupUser (user) {
    console.log('Signing Up User:', user)
    // async signupUser(user) {
    //   await auth.signup(user)
    //   const profile = await auth.profile()

    //   this.setState({ currentUserId: profile.user._id })
    //   }
    
  }

  render () {
    return (
      <Router>
        <Header />
        <Navigation 
        currentUserId={this.state.currentUserId}
        logoutUser={this.logoutUser} />
        <Switch>
          <Route path='/login' exact component={() => {
            return <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' component={UsersContainer} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
