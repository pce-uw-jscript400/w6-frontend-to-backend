import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import PostsContainer from '../posts/Container'

import * as users from '../../api/users'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  render () {
    const { users } = this.state
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer users={users} />
      </main>
    )
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const userList = await users.getUsers()
      this.setState({ users: userList })
    }
  }
}
