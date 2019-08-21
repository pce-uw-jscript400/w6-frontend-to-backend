import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

import * as auth from '../api/auth'
// import { login } from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null,
      loading: true
    }

    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app') //declare what the token is
    if (token) { //make a request to see if token exists
      const profile = await auth.profile() //declare user profile
      this.setState({ currentUserId: profile.user._id }) //set state of currentUserId to be the user's token
    }
    this.setState({ loading: false })
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id})
    console.log(profile)
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id})
  }

  logoutUser () {
    window.localStorage.removeItem('journal-app')
    this.setState({ currentUserId: null })
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>

    return (
      <Router>
        <Header />
        <Navigation 
          currentUserId={this.state.currentUserId} 
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/users'/>
            ) : (
              <Login onSubmit={this.loginUser} />
            )
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/users'/>
            ) : (
              <Signup onSubmit={this.signupUser} />
            )
          }} />
          <Route path='/users' render={() => {
            return this.state.currentUserId ? <UsersContainer /> : <Redirect to='/login'/>
          }} />
          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
