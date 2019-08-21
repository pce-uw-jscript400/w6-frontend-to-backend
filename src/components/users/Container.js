import React from 'react'
import { Route } from 'react-router-dom'

import * as api from '../../api/users'

import List from './List/List'
import PostsContainer from '../posts/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }

    this.refreshUsers = this.refreshUsers.bind(this)
  }

  async refreshUsers () {
     const { response } = await api.fetchUsers()
     this.setState({ users: response })
  }

  async componentDidMount() {
    this.refreshUsers().then(() => this.setState({loading: false}))
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state
    if(loading) return <p>Loading...</p>
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer 
        currentUserId={currentUserId}
        users={users} 
        refreshUsers={this.refreshUsers}/>
      </main>
    )
  }
}
