import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'
import * as posts from '../../api/posts'
import * as users from '../../api/users'
import {withRouter} from 'react-router'
import UpdateForm from '../users/Form/UpdateForm';
import { type } from 'os';

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.updateUser= this.updateUser.bind(this)
  }

  createPost (post) {
    console.log('Submitting Post:', post)
  }

  async destroyPost (userId, postId) {
    //console.log('Destroying Post:', postId)
    const response = await posts.deletePosts(userId, postId)
    console.log(response);
    this.props.history.push(`/users/${userId}/posts`)
  }

  editPost (post) {
    console.log('Editting Post:', post)
  }

  async updateUser (newName, userId) {
    console.log(newName, typeof(newName), userId);
    const response = await users.update(newName, userId)
    console.log(response);
    this.props.history.push(`/users/${userId}/posts`)
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
        <Route path='/users/:userId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return <UpdateForm onSubmit={this.updateUser} user={user}/>
        }} />
      </>
    )
  }
}

export default withRouter(Container)