import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

//helper functions
import * as auth from '../api/auth.js'
import * as token from '../helpers/local-storage'

//components
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

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

  // on component did mount lifecycle hook
  async componentDidMount () {
    //if there's a token, let's try and login
    if (token.getToken()) {
      //get the profile object back from the profile function
      const { user } = await auth.profile()
      //set our application state equal to that userId
      this.setState({ currentUserId: user._id, loading: false})
    } else {
      this.setState({ loading: false })
    }
    //at this point we'll re-render our application with that state and the correct navigation will be drawn
  }

  async loginUser (user) {
    const response = await auth.login(user)
    await token.setToken(response)
    const profile = await auth.profile()
    this.setState({ currentUserId: profile.user._id })
  }

  logoutUser () {
    token.clearToken()
    this.setState({ currentUserId: null })
  }

  async signupUser (user) {
    const response = await auth.signup(user)
    await token.setToken(response)
    const profile = await auth.profile()
    this.setState({ currentUserId: profile.user._id })
  }

  render () {
    const { currentUserId, loading } = this.state
    if(loading) return <p>Loading...</p>
    return (
      <Router>
        <Header />
        <Navigation currentUserId={currentUserId} logoutUser={this.logoutUser}/>
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return currentUserId ? <UsersContainer currentUserId={currentUserId}/> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
