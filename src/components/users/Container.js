import React from 'react'
import { Route } from 'react-router-dom'

// Helpers
import * as users from '../../api/users'

// Components
import List from './List/List'
import PostsContainer from '../posts/Container'
import EditUser from './Edit.Form'


export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }

    this.refreshUsers = this.refreshUsers.bind(this)
    this.edit = this.edit.bind(this)
  }

  async componentDidMount () {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  // Internal
  async refreshUsers () {
    const { response } = await users.fetchUsers()
    this.setState({ users: response })
  }

  async edit(name){
    //console.log(`ALYLOG:${JSON.stringify(name)}`)
    const{ response } = await users.updateUsername({ user: { _id: this.props.currentUserId }, name })
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state
    if (loading) return <span/>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <Route path='/users/:userId/edit' exact component={() => {
          return <EditUser onSubmit={this.edit} />
        }} />
        <PostsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    )
  }
}
