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
      loading: true,
      showAlert: false
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  // loginUser (user) {
  //     console.log('Logging In User:', user)
  //     fetch('http://localhost:5000/api/login', {
  //       body: JSON.stringify(user),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'POST',
  //     }).then(res => res.json()).then(console.log)
  // }

  //When the react component gets loaded/mounted, the code inside of it will check to see if there is a valid token in the users local storage.
  //If the token already exists in local storage, then it will make a call to our /profile route and the json that gets back is used to set the 'currentUserId' state to the users // IDEA:
  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const profile = await auth.profile()
      console.log(profile)
      this.setState({
        currentUserId: profile.user._id,
        currentUserUsername: profile.user.username,
      })

    }

    this.setState({loading: false})

  }


  //Async Version
  async loginUser (user) {
    const response = await auth.login(user)
    const userInfo = await auth.profile()
    // console.log(response, userInfo)
    if(response.status === 401){
      this.setState({
        showAlert: true
      })
    }else{
      this.setState({
        currentUserId: userInfo.user._id,
        currentUserUsername: userInfo.user.username,
      })
    }


  }

  async signupUser (user) {
    await auth.signup(user)

    const userInfo = await auth.profile()


    if(userInfo.status === 401){
      this.setState({
        showAlert: true
      })
    }else{
      this.setState({
        currentUserId: userInfo.user._id,
        currentUserUsername: userInfo.user.username,
      })
    }
    // this.loginUser(user)
  }


  logoutUser() {
    window.localStorage.removeItem('journal-app')
    this.setState({currentUserId: null})

  }



  render () {
    const { currentUserId, loading, showAlert } = this.state

    if(loading) return <p>Loading...</p>

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          currentUserUsername={this.state.currentUserUsername}
          logoutUser={this.logoutUser}/>
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/users' />
            ) : (
              <Login onSubmit={this.loginUser} showAlert={showAlert}/>
            )
          }} />

          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/users' />
            ) : (
              <Signup onSubmit={this.signupUser} showAlert={showAlert}/>
            )
          }} />


          <Route path='/users' component={() => {
            return this.state.currentUserId ? <UsersContainer currentUserId={currentUserId} /> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />

        </Switch>
      </Router>
    )
  }
}

export default App
