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
      username : null,  // (Q3) Create a new state to store the username, so that this can be passed on to the navigation links
      loading : true,
      invalidCreds : false
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id, username: profile.user.name })
    }
    this.setState({loading : false})
  }


  async loginUser(user)
  {
    await auth.login(user);
    const profile = await auth.profile();
    if (profile.status === 200)
    {
      this.setState({currentUserId : profile.user._id, username: profile.user.name, invalidCreds : false})
    }
    else
    {
      this.setState({invalidCreds : true})
    }
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()
    if (profile.status === 200)
    {
      this.setState({currentUserId : profile.user._id, username: profile.user.name})
    }
  }

  logoutUser() {
    window.localStorage.removeItem('journal-app')
    this.setState({currentUserId : null, username : null})
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>
    return (
      <Router>
        <Header />
        <Navigation
          currentUserId = {this.state.currentUserId}
          username = {this.state.username} //(Q3) Pass the user name to Navigation component
          logoutUser = {this.logoutUser} />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} invalidCreds={this.state.invalidCreds}/>
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} />
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
