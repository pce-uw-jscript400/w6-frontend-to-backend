import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default ({ destroyPost, post, user }) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    <Link className='btn btn-link' to={`/users/${user._id}/posts/${post._id}/edit`}>Edit Post</Link>
    <button
      className='btn btn-link text-danger'
      onClick={() => destroyPost(user._id, post._id )}>
      Delete Post
        </button>
    <span className='btn btn-link text-muted' disabled>Created {moment(post.created_at).fromNow()}</span>
  </div>
)