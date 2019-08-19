import React from 'react'
import { Link } from 'react-router-dom'

import Actions from './List.Actions'

export default ({ destroyPost, user }) => {
  if(user.posts.length < 1) return (
    <>
      <h1 className='mb-4'>{ user.username }'s Posts</h1>
      <p>No Posts Found. <Link className='nav-link' to={`/users/${user._id}/posts/new`}> Create a new post</Link> 
      </p>
    </>
  )

  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ post.content }</p>
        <blockquote className='blockquote mb-0'>
        {post.emotion !== '' ?
            `<footer className='blockquote-footer'> Was feeling: ${post.emotion}</footer>`:''}
        </blockquote>
      </div>
      <Actions destroyPost={destroyPost} post={post} user={user} />
    </div>
  ))
  const name = user.name !== '' ? user.name : user.username
  return (
    <>
      <h1 className='mb-4'>{ name }'s Posts</h1>
      { posts }
    </>
  )
}
