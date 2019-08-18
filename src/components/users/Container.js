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

  async componentDidMount() {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  async refreshUsers() {
    const { response } = await users.getAllUsers()
    this.setState({ users: response })
  }

  render () {
    const { users, loading } = this.state
    const { currentUserId } = this.props

    if (loading) return <div>Loading...</div>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer 
          currentUserId={currentUserId} 
          refreshUsers={this.refreshUsers}
          users={users}
        />
      </main>
    )
  }
}
