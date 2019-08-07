import React from 'react'
import { Route } from 'react-router-dom'
import { users } from '../api/users'

import List from './List/List'
import PostsContainer from '../posts/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    const response = await users()
    this.setState({users: response})
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
