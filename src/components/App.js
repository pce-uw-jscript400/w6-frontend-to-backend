import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as auth from '../api/auth.js'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()
    this.setState({
      currentUserId: profile.user._id
    })
  }

  signupUser (user) {
    console.log('Signing Up User:', user)
  }

  logoutUser = () => {
    window.localStorage.removeItem('journal-app')
    this.setState({
      currentUserId: null
    })
  }

  // on component did mount lifecycle hook
  async componentDidMount () {
    //grab the token from local storage
    const token = window.localStorage.getItem('journal-app')
    //if there's a token, let's try and login
    if (token) {
      //get the profile object back from the profile function
      const profile = await auth.profile()
      //set our application state equal to that userId
      this.setState({ currentUserId: profile.user._id })
    }
    //at this point we'll re-render our application with that state and the correct navigation will be drawn
  }

  render () {
    return (
      <Router>
        <Header />
        <Navigation currentUserId={this.state.currentUserId} logoutUser={this.logoutUser}/>
        <Switch>
          <Route path='/login' exact component={() => {
            return <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' component={UsersContainer} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
