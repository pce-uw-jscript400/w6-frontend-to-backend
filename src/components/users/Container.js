import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import PostsContainer from '../posts/Container'
import PostData from '../../api/posts'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = PostData
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
