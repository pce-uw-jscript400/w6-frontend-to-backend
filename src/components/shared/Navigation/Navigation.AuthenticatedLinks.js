import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { logout,profile } from '../../api/auth';

const AuthenticatedLinks = ({ currentUserId, logoutUser, userName, history }) => {
  const logout = () => {
    logoutUser()
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
          {`${userName}`}
        </Link>
      </li>
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logoutUser}>
            Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(AuthenticatedLinks)
