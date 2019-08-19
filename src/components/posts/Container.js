import React from 'react'
import { Route } from 'react-router-dom'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'
import UserForm from './Form/EditUser.Form'
import {deletePost, createPost} from '../api/posts'
import {updateUser} from '../api/users'
import * as auth from '../api/auth'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.edit = this.editPost.bind(this)
    this.state = {
      loading: true,
      currentUserId: this.props.currentUserId
    }
  }

  async componentDidMount () {
  }

  createPost (user, post) {
    createPost(user, post)
    console.log('Submitting Post:', post, 'user:', user)
  }

  destroyPost (user, post) {
    deletePost(user,post)
    console.log('Destroying Post:', post)
  }

  editPost (post) {
    console.log('Editting Post:', post)
  }

  updateUser (user, update) {
    updateUser(user, update)
  }

  render () {
    const { users } = this.props
    return (
      <>
        <Route path='/users/:userId/posts' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          console.log(user)
          return <List destroyPost={this.destroyPost} user={user} />
        }} />
        <Route path='/users/:userId/posts/new' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return <NewForm onSubmit={this.createPost} user={user}/>
        }} />
        <Route path='/users/:userId/posts/:postId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          const post = user.posts.find(user => user._id === match.params.postId)
          return <EditForm onSubmit={this.editPost} post={post} />
        }} />
        <Route path='/users/:userId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return <UserForm onSubmit={this.updateUser} user={user} />
        }} />
      </>
    )
  }
}
