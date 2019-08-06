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
            currentUserId: null
        }

        this.loginUser = this.loginUser.bind(this)
        this.signupUser = this.signupUser.bind(this)
        this.logoutUser = this.logoutUser.bind(this)
    }

    async loginUser(user) {
        await auth.login(user)
        const userInfo = await auth.profile()
        console.log(userInfo)
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
            this.setState({ currentUserId: profile.user._id })
        }
    }

    async signupUser(user) {
      await auth.signUp(user)
      const userInfo = await auth.profile()
      console.log(userInfo)
      if (userInfo.status == '200') {
          this.setState({
              currentUserId: userInfo.user._id
          })
        withRouter.history.push('/users')
      }
    }

   logoutUser = () => {
      this.setState({
        currentUserId: null
      })
      window.localStorage.removeItem('journal-app')

    }

    render() {
        return ( < Router >
            <  Header / >
            < Navigation 
            currentUserId = { this.state.currentUserId }
            logoutUser = {this.logoutUser}
            /> 
            <Switch >
            < Route path = '/login'exact component = {() => {
                    return <Login onSubmit = { this.loginUser }/> }
            }/> 
            <Route path = '/signup'
            exact component = {() => {
              return <Signup onSubmit = { this.signupUser }/>
              }}/>

            <Route path = '/users'
            component = { UsersContainer }/>

            <Redirect to = '/login' / >
            </Switch> 
            < /Router >
        )
    }
}

export default App