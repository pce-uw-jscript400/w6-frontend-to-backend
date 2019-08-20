import React from 'react'
import { Route } from 'react-router-dom'

// Helpers
import * as users from '../../api/users'

// Components
import List from './List/List'
import PostsContainer from '../posts/Container'
import EditName from './Form/Edit.Name'

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

  // Internal
  async refreshUsers () {
    const { response } = await users.fetchUsers()
    this.setState({ users: response })
  }

  async editUser (user) {
    const { currentUserId, history, refreshUsers } = this.props

    await users.updateUser({ user: { _id: currentUserId }, user })
    await refreshUsers()

    history.push(`/users/${currentUserId}/posts`)
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state
    if (loading) return <span/>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <Route path='/users/:userId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          console.log(user)
          return <EditName user={user}/>}} />
        <PostsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    )
  }
}
