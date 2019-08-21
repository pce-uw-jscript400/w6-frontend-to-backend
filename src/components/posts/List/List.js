import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyPost, user }) => {
  console.log(currentUserId)
  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ post.content }</p>
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>Was feeling: { post.emotion }</footer>
        </blockquote>
      </div>
      <Actions destroyPost={destroyPost} post={post} user={user} currentUserId={currentUserId}/>
    </div>
  ))

  return (
    <>
      <h1 className='mb-4'>{ user.username }'s Posts</h1>
      { posts }
    </>
  )
}
