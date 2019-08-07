import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'
import * as posts from '../../api/posts'

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
    // console.log('Destroying Post:', post)
    const response = await posts.remove(userId, postId)
    console.log (response)
    this.props.history.push()
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
          return <NewForm onSubmit={this.createPost}/>
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

export default {withRouter}