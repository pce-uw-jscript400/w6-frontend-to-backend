import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import PostsContainer from '../posts/Container'

import * as api from '../../api/users'


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
//       }
//     ]
//   }
// ]
export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }

    this.refreshUsers = this.refreshUsers.bind(this)
  }

  async componentDidMount () {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  async refreshUsers () {
    const { response } = await api.getAllUsers()
    this.setState({ users: response })
  }
  // async componentDidMount() {
  //   const token = window.localStorage.getItem('journal-app')
  //   if (token) {
  //     const users = await api.getAllUsers()
  //     this.setState({ users: users })
  //   }
  //   this.setState({ loading: false })
  // }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state
    if (loading) return <p>Loading...</p>
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    )
  }
}
