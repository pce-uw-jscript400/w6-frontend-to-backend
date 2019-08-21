import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AuthenticatedLinks = ({ currentUserName, currentUserId, logoutUser, history }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }
  return (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link className='nav-link' to='/users'>All Users</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/users/${currentUserId}/posts/new`}>
          Create a New Post
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/users/${currentUserId}/edit`}>
          {currentUserName}
        </Link>
      </li>
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logout}>
            Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(AuthenticatedLinks)
