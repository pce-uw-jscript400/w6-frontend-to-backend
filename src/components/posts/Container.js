import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import * as api from '../../api/posts'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)
  }

  async createPost (post) {
    const { currentUserId, refreshUsers, history } = this.props
    console.log('Submitting Post:', post)
    await api.createPost({user: {_id: currentUserId}, post})
    await refreshUsers()
    history.push(`/users/${currentUserId}/posts`)
    
  }

  async destroyPost (post) {
    const { currentUserId, refreshUsers, history } = this.props
    console.log('Deleting post:', post)
    await api.destroyPost({user: { _id: currentUserId }, post})
    await refreshUsers()
    history.push(`/users/${currentUserId}/posts`)
  }

  async editPost (post) {
    const { currentUserId, refreshUsers, history } = this.props
    console.log('Editting Post:', post)
    await api.editPost({user: {_id: currentUserId}, post})
    await refreshUsers()
    history.push(`/users/${currentUserId}/posts`)
  }

  render () {
    const { currentUserId, users } = this.props
    return (
      <>
        <Route path='/users/:userId/posts' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return <List currentUserId={currentUserId} destroyPost={this.destroyPost} user={user} />
        }} />
        <Route path='/users/:userId/posts/new' exact component={() => {
          return <NewForm onSubmit={this.createPost} />
        }} />
        <Route path='/users/:userId/posts/:postId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          const post = user.posts.find(user => user._id === match.params.postId)
          return <EditForm onSubmit={this.editPost} post={post} />
        }} />
      </>
    )
  }
}

export default withRouter(Container)