import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import * as api from '../../api/posts'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: [],
      loading:true
    }
    this.createPost = this.createPost.bind(this)
    this.destroyPost = this.destroyPost.bind(this)
    this.editPost = this.editPost.bind(this)

  }

  async componentDidMount(){
    const { currentUserId, history, refetchUsers } = this.props
    const token = window.localStorage.getItem('journal-app')
    if(token){
      const getPosts = await refetchUsers()
      this.setState({
        loading: false
      })
    }
  }



  async createPost (post) {
    const { currentUserId, history, refetchUsers } = this.props
    console.log('Submitting Post:', currentUserId)
    const response = await api.createPost({user: { _id: currentUserId }, post})
    await refetchUsers()
    // console.log(allPostsAgain)
    history.push(`/users/${currentUserId}/posts`)
  }

  async destroyPost (post) {
    const { currentUserId, history, refetchUsers } = this.props
    const response = await api.deletePost({user: { _id: currentUserId }, post})
    await refetchUsers()
    history.push(`/users/${currentUserId}/posts`)
  }

  async editPost (post) {
    console.log('Editing Post:', post)
    const { currentUserId, history, refetchUsers } = this.props
    const response = await api.updatePost({user: { _id: currentUserId}, post})
    await refetchUsers()
    history.push(`/users/${currentUserId}/posts`)
  }

  //
  // async refetchPosts(currentUserId){
  //   const getAllUsersPost = await api.getAllPosts(currentUserId)
  //   this.setState({ myposts: getAllUsersPost })
  //
  //   const { currentUserId, history } = this.props
  //   console.log('Getting Users Post:', currentUserId)
  //   const response = await api.getAllPosts({user: { _id: currentUserId }, post})
  //   await api.getAllPosts({user: { _id: currentUserId }, post})
  //   history.push(`/users/${currentUserId}/posts`)
  //
  // }

  render () {
    const { users, currentUserId } = this.props
    const { loading } = this.state
    if (loading) return <div></div>

    return (
      <>
        <Route path='/users/:userId/posts' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          // if(user._id === currentUserId && user.posts.length === 0){
          //   return <div>You have no previous post. Please consider creating one.</div>
          // }
          return <List destroyPost={this.destroyPost} user={user} currentUserId={currentUserId}/>
        }} />
        <Route path='/users/:userId/posts/new' exact component={() => {
          return <NewForm onSubmit={this.createPost} />
        }} />
        <Route path='/users/:userId/posts/:postId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          const post = user.posts.find(user => user._id === match.params.postId)
          return <EditForm onSubmit={this.editPost} post={post} user={user}/>
        }} />
      </>
    )
  }
}

export default withRouter(Container)
