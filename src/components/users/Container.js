import React from 'react'
import { Route } from 'react-router-dom'
import * as api from '../../api/users'
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

  async componentDidMount(){
    const token = window.localStorage.getItem('journal-app')
    if(token) {
      const users = await api.getAllUsers()
      this.setState({ users })
    }
  }
 
  // removePost
  // -- would remove a single post from the state;
  // calling set state

  // refetchState
  // -- would refetch the entire state (a resource),
  // and set that state, overwritting the previous
  // state

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
