import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import * as api from '../../api/posts'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'
import removePost from '../users/Container'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)
  }

  

  createPost (post) {
    console.log('Submitting Post:', post)
  }

  async destroyPost (userId, postId) {
    await api.deletePost(userId, postId)
    this.props.history.push(`/users/${userId}/posts`)
    removePost()
  }

  editPost (post) {
    console.log('Editing Post:', post)
  }

  render () {
    const { users } = this.props
    return (
      <>
        <Route path='/users/:userId/posts' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return <List destroyPost={this.destroyPost} user={user} />
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