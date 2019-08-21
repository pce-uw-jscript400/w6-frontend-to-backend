import React from 'react'
import { Route } from 'react-router-dom'


import * as users from '../../api/users.js'

import List from './List/List'
import PostsContainer from '../posts/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [
      { posts: [] }
      ]
    }
  }

   async componentDidMount() {
       const token = window.localStorage.getItem('journal-app')

       if (token) {
        const getUsers = await users.users()

        this.setState({ users: getUsers })
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
}
