import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyPost, user }) => {
  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ post.content }</p>
        { post.emotion &&
          <blockquote className='blockquote mb-0'>
            <footer className='blockquote-footer'>Was feeling: { post.emotion }</footer>
          </blockquote>
        }
      </div>
      <Actions currentUserId={currentUserId} destroyPost={destroyPost} post={post} user={user} />
    </div>
  ))

  if(posts.length === 0 && user._id === currentUserId) {
    return <h1 className='mb-4'>You have no posts. Please create a post.</h1>
  }

  return (
    <>
      <h1 className='mb-4'>{ user.username }'s Posts</h1>
      { posts }
    </>
  )
}
