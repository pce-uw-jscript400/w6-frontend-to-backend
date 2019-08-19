import React from 'react'
import { Route } from 'react-router-dom'
import * as api from '../../api/users'
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
      const users = await api.getAllUsers()
      this.setState({ users })
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
