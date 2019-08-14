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

  async componentDidMount () {
    // get the token from local storage
    const token = window.localStorage.getItem('journal-app')
    // if the token exists...
    if (token) {
      // get the profile for the user
      const { user } = await auth.profile()
      // set the user ID for the current user
      this.setState({ currentUserId: user._id, loading: false })
    }
    this.setState({ loading: false })
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()
    this.setState({ currentUserId: profile.user._id })
  }

  async signupUser (user) {
    try {
      await auth.signup(user)

      if (!user.username) {
        // const error = { status: 404, message: 'Please enter a valid username.' }
        // throw new Error(error)
      } else if (!user.password) {
        // const error = { status: 404, message: 'Please enter a valid password.' }
        // throw new Error (error)
      } else {
        const profile = await auth.profile()
        this.setState({ currentUserId: profile.user._id })
      }  
    }
    catch(error) {
      // console.log(error)
      // throw new Error (error)
    }
  }

  logoutUser() {
    window.localStorage.removeItem('journal-app')
    this.setState({currentUserId: null})
  }

  render () {
    const { currentUserId, loading } = this.state
    if (loading) return <div>Loading...</div>

    return (
      <Router>
        <Header />
        <Navigation 
        currentUserId={currentUserId}
        logoutUser={this.logoutUser}
        />
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUserId ? (
              <Redirect to="/users" />
            )
            : (
            <Login onSubmit={this.loginUser} />
            )
          }} />

          <Route path='/signup' exact component={() => {
            return currentUserId ? (
              <Redirect to="/users" />
            )
            : (
            <Signup onSubmit={this.signupUser} />
            )
          }} />

          <Route path='/users' render={() => {
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
