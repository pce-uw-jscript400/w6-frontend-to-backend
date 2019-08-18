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

  // every time react is ready get the token from local storage that says that a user is logged in
  // if there is a token set the state for currentUserId to their user ID from the database 

  async componentDidMount() {
    const token = window.localStorage.getItem('journal-app')

    if (token) {
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id, loading: false })
    } else { 
      this.setState({ loading: false })
    }
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id })
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id })
  }

  logoutUser () {
    window.localStorage.removeItem('journal-app')
    this.setState({ currentUserId: null })
  }

  render() {
    
    const { currentUserId, loading } = this.state
    if (loading) return <span />

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={currentUserId}
          logoutUser={this.logoutUser} />
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return currentUserId
              ? <UsersContainer currentUserId={currentUserId} />
              : <Redirect to='/login' />
          }} />

          <Route path='/users/:userID' render={() => {
            return currentUserId
              ? <UsersContainer currentUserId={currentUserId} />
              : <Redirect to='/login' />
          }} />
          

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
