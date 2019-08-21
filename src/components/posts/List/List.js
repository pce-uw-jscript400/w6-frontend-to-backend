import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyPost, user }) => {
  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ post.content }</p>
        {post.emotion && (
          <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>Was feeling: { post.emotion }</footer>
        </blockquote>
        )}
      </div>
      <Actions
        currentUserId={currentUserId}
        destroyPost={destroyPost}
        post={post}
        user={user} />
    </div>
  ))

  if (posts.length === 0) {
    return (
      <> 
        <p>Hi { user.name || user.username } it appears you have not made any posts, you should make your first post!</p> 
      </>
    )
  } else {
    return (
      <>
      <h1 className='mb-4'>{ user.name || user.username }'s Posts</h1>
      { posts }
    </>
    )
  }
}
