import React from 'react'
import { Link } from 'react-router-dom'

export default ({ users }) => {
  const lis = users.map(user => (
    <li key={user._id}>
      <Link to={`/users/${user._id}/posts`}>
        { user.name ? user.name : user.username }: {user.posts.length} Posts
      </Link>
    </li>
  ))

  return (
    <>
      <h1>All Journals</h1>
      <ul>
        { lis }
      </ul>
    </>
  )
}
