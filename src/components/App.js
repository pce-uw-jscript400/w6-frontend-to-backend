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

  async componentDidMount() {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const profile = await auth.profile()
      this.setState({ currentUserId: profile.user._id})
    }
    this.setState({loading: false})

    // get(/:"example.user");
    //Right now, the data inside of `users/Container.js` is static. 
    // users: [
    //   {
    //     _id: '5de4',
    //     username: 'example.user',
    //     posts: [
    //       {
    //         _id: '6cj2',
    //         content: 'This is an example post.',
    //         emotion: 'joy',
    //         created_at: new Date('2019-07-01')
    // In `componentDidMount()`, update this code so that we 
    // pull our data from our API.


  }

  // history.push() (can't use in this file tho)
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

  render () {
    if (this.state.loading) return <p>Loading...</p>

    return (
      // history.push()
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
          />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to="/users"/>
            ) :
            (
              <Login onSubmit={this.loginUser} />
            )
          }} />

          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to="/users"/>
            ) :
            (
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