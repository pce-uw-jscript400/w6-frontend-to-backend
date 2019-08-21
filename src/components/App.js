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
      currentUserName: null,
      loading: true
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()
    this.setState({
      currentUserId: profile.user._id,
      currentUserName: profile.user.name ? profile.user.name : profile.user.username    })
  }

  logoutUser() {
    window.localStorage.clear('journal-app')
    this.setState({
      currentUserId: null,
      currentUserName: null
    })
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()
    this.setState({
      currentUserId: profile.user._id,
      currentUserName: profile.user.name ? profile.user.name : profile.user.username
    })
  }

  async updateName() {
    const profile = await auth.profile()
    this.setState({
      currentUserName: profile.user.name ? profile.user.name : profile.user.username
    })
  }

  render () {
    const { currentUserName, currentUserId, loading } = this.state

    if(loading) return <p>loading...</p>

    return (
      <Router>
        <Header />
        <Navigation currentUserName={currentUserName} currentUserId={currentUserId} logoutUser={this.logoutUser} />
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return  currentUserId ? <UsersContainer onUpdateName={this.updateName} currentUserId={currentUserId} /> : <Redirect to='/login' />
          }} />
          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const profile = await auth.profile()
      if(profile.user) {
        this.setState({ 
          currentUserId: profile.user._id, 
          currentUserName: profile.user.name ? profile.user.name : profile.user.username
        })
      } else {
        this.logoutUser()
      }
    } 
    this.setState({ loading: false })
  }
}

export default App
