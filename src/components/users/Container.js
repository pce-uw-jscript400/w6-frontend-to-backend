import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import * as api from '../../api/users'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import PostsContainer from '../posts/Container'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading:true
    }
    this.editUser = this.editUser.bind(this)
    this.refetchUsers = this.refetchUsers.bind(this)
  }


 async componentDidMount(){
   const { currentUserId, history, refetchUsers } = this.props
   const token = window.localStorage.getItem('journal-app')
   if(token){
     const getUser = await api.getOneUser()
     this.setState({
       users: getUser,
       loading: false
     })
   }
 }

 //removePost
 // --would remove a single post from the state;
 // calling set strategy

//refetchState
async refetchUsers(){
  const getUserAgain = await api.getOneUser()
  this.setState({ users: getUserAgain })
}


async editUser (user) {
  console.log('Editing User Information:', user)
  const { history } = this.props
  const response = await api.updateUser({user: { _id: user._id}, user})
  this.refetchUsers()
  history.push(`/users/${user._id}/posts`)
}



  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state

    if (loading) return <div></div>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer currentUserId={currentUserId} users={users} refetchUsers={this.refetchUsers}/>

        <Route path='/users/:userId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          // const post = user.posts.find(user => user._id === match.params.postId)
          return <EditForm onSubmit={this.editUser} user={user} refetchUsers={this.refetchUsers}/>
        }} />
      </main>
    )
  }
}

export default withRouter(Container)
