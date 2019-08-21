import React from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

import * as auth from '../api/auth'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUserId: null,
            loading: false
        }

        this.loginUser = this.loginUser.bind(this)
        this.signupUser = this.signupUser.bind(this)
        this.logoutUser = this.logoutUser.bind(this)
    }

    async loginUser(user) {
        await auth.login(user)
        const userInfo = await auth.profile()
        console.log(userInfo.user._id)
        if (userInfo.status == '200') {
            this.setState({
                currentUserId: userInfo.user._id
            })
        }
    }

    async componentDidMount() {
        const token = window.localStorage.getItem('journal-app')

        if (token) {
            const profile = await auth.profile()
            console.log(profile.user._id)
            this.setState({ 
              currentUserId: profile.user._id, 
              loading: false 
            })
        }
    }

    async signupUser(user) {
      await auth.signUp(user)
      // const userInfo = await auth.profile()
      // why does this not work?
      // console.log(userInfo)
      // if (userInfo.status == '200') {
      //     this.setState({
      //         currentUserId: userInfo.user._id
      //     })
      //   withRouter.history.push('/users')
      // }

    }

   logoutUser = () => {
      this.setState({
        currentUserId: null
      })
      window.localStorage.removeItem('journal-app')
      console.log('Logged out!')

    }

    render () {
      const { currentUserId, loading } = this.state
      if (loading) return <span />
  
      return (
        <Router>
          <Header />
          <Navigation
            currentUserId={currentUserId}
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