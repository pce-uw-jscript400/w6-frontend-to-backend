import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import PostsContainer from '../posts/Container'

import * as users from '../../api/users'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
    this.refreshUsers = this.refreshUsers.bind(this)
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state

    if(loading) return <span/>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer currentUserId={currentUserId} users={users} refreshUsers={this.refreshUsers} />
      </main>
    )
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const userList = await users.getUsers()
      this.setState({ users: userList, loading: false })
    } else {
      this.setState({ loading: false })
    }
  }

  async refreshUsers() {
    const userList = await users.getUsers()
    this.setState({ users: userList })
  }
}
