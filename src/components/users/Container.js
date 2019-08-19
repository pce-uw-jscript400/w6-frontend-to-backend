import React from 'react'
import { Route } from 'react-router-dom'
import * as users from '../../api/users'
import List from './List/List'
import PostsContainer from '../posts/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [ ]
    }
  }

  async componentDidMount(){
    const token = window.localStorage.getItem('journal-app')
    if(token) {
      const getUsers = await users.users()
      this.setState({ users: getUsers})
    }
  }
  // {
  //   _id: '5de4',
  //   username: 'example.user',
  //   posts: [
  //     {
  //       _id: '6cj2',
  //       content: 'This is an example post.',
  //       emotion: 'joy',
  //       created_at: new Date('2019-07-01')
  //     }
  //   ]
  // }
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
