import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

// Helpers
import * as auth from '../api/auth'
import * as token from '../helpers/local-storage'

// Components
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      showAlert: false,
      currentUserId: null,
      currentUserName: null,
      loading: true
    }

    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
  }

  async componentDidMount () {
    if (token.getToken()) {
      const { user } = await auth.profile();
        this.setState({ currentUserId: user._id, currentUserName: user.name, loading: false });
      } else {
      this.setState({ currentUserId: null, loading: false })
    }
  }


  async loginUser (user) {
    const response = await auth.login(user)
    await token.setToken(response)
    
    const profile = await auth.profile()
    if (profile.status === 401) {
      alert('Username or password is incorrect!')
      this.setState({ showAlert: true })
    } else {
      this.setState({ currentUserId: profile.user._id })
    } 
  }

  logoutUser () {
    token.clearToken()
    this.setState({ currentUserId: null })
  }

  async signupUser (user) {
    const response = await auth.signup(user)
    await token.setToken(response)
    
    const profile = await auth.profile()
    console.log(profile)
    if (profile.status === 401) {
      alert('Username already exists!')
      this.setState({ showAlert: true })
    } else {
      this.setState({ currentUserId: profile.user._id })
    }
  }

  render () {
    const { currentUserId, currentUserName, loading } = this.state
    if (loading) return <span />

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={currentUserId}
          currentUserName={currentUserName}
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

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
