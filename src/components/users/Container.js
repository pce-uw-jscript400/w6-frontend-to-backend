import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import PostsContainer from '../posts/Container'
import * as users from '../../api/users'


export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users:[]
    }
    this.refreshUsers = this.refreshUsers.bind(this)
  }
  // async componentDidMount() {
  //   const token = window.localStorage.getItem('journal-app')
  //   if (token){
  //     const getUsers = await users.users()
  //     this.setState({users:getUsers})
  //   }
  // }

  async componentDidMount () {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  // Internal
  async refreshUsers () {
    const response = await users.users()
    console.log(response)
    this.setState({ users: response })
  }
  //refetch state

  render () {
    const { users } = this.state
    console.log(this.props.currentUserId)
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer users={users}
        currentUserId={this.props.currentUserId}
        refreshUsers = {this.refreshUsers} />
      </main>
    )
  }
}

