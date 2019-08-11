import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as auth from '../api/auth'
import * as token from '../helpers/local-storage'
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

  async componentDidMount() {
    const token = window.localStorage.getItem('journal-app')
    console.log(token)
    if (token) {
    //   const profile = await auth.profile()
    //   this.setState({ currentUserId: profile.user._id })
    // }
    // this.setState({ loading: false })

      const { user } = await auth.profile()
      console.log(user)
      this.setState({ currentUserId: user._id, loading: false })
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
    token.clearToken()
    this.setState({ currentUserId: null })
  }

  render () {
    const { currentUserId, loading } = this.state
    if (loading) return <p>Loading...</p>
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
              <Redirect to='/users'/>
              ) : (
              <Login onSubmit={this.loginUser} />
              )
          }} />
          <Route path='/signup' exact component={() => {
            return currentUserId ? (
              <Redirect to='/users'/>
              ) : (
              <Signup onSubmit={this.signupUser} />
              )
          }} />
          <Route path='/users' render={() => {
            return currentUserId
              ? <UsersContainer />
              : <Redirect to='/login' />
          }} />
          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}
export default App
