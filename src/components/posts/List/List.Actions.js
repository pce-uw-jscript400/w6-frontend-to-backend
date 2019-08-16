import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default ({ currentUserId, destroyPost, post, user }) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    {
      currentUserId === user._id
      && (
        <>
          <Link className='btn btn-link' to={`/users/${user._id}/posts/${post._id}/edit`}>Edit Post</Link>
          <button
            className='btn btn-link text-danger'
            onClick={() => destroyPost(post)}>
            Delete Post
          </button>
        </>
      )
    }

    <span className='btn btn-link text-muted' disabled>Created {moment(post.created_at).fromNow()}</span>
  </div>
)
