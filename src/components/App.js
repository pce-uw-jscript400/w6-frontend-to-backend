import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as auth from './api/auth'

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
    const token = window.localStorage.getItem('journal-app')
    console.log(token)
    if (token) {
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id, userName: profile.user.name })
    }
    this.setState({loading: false})
  }

  async loginUser (user) {
    const response = await auth.login(user)
    if (response.status === 200){
      const userProfile = await auth.profile()
      this.setState({ 
        currentUserId: userProfile.user._id, 
        userName: userProfile.user.name
      })
    } 
    return response
  }

  async signupUser (user) {
    const response = await auth.signup(user)
    if (response.status == 201){
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id})  
    }
    return response
  }

  logoutUser = () => {
    window.localStorage.removeItem('journal-app')
    this.setState({ currentUserId: null })
  }

  render () {
    if (this.state.loading) return "Loading..."
    return (
      <Router>
        <Header />
        <Navigation 
          currentUserId={this.state.currentUserId} 
          logoutUser={this.logoutUser}
          userName = {this.state.userName}
        />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Login onSubmit={this.loginUser} />
              )
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to="/users" />
            ) : (
              <Signup onSubmit={this.signupUser} />
            )
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
