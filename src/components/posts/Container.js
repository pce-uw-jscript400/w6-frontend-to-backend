import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

import * as api from '../../api/posts'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      loading: true
    }

    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)
  }

  // async componentDidMount() {
  //   const token = window.localStorage.getItem('journal-app')
  //   if (token) {
  //     const posts = await api.getPosts()
  //     this.setState({ posts: posts })
  //   }
  //   this.setState({ loading: false })
  // }

  async createPost (post) {
    const { currentUserId, history, refreshUsers } = this.props

    await api.createPost({ user: { _id: currentUserId }, post })
    await refreshUsers()

    history.push(`/users/${currentUserId}/posts`)
  }

  async destroyPost (post) {
    const { currentUserId, history, refreshUsers } = this.props

    await api.destroyPost({ user: { _id: currentUserId }, post })
    await refreshUsers()

    history.push(`/users/${currentUserId}/posts`)
  }

  async editPost (post) {
    const { currentUserId, history, refreshUsers } = this.props

    await api.updatePost({ user: { _id: currentUserId }, post })
    await refreshUsers()

    history.push(`/users/${currentUserId}/posts`)
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>
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
