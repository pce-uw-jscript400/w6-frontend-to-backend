import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyPost, user }) => {
  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{post.content}</p>
        {post.emotion === '' ? <p></p> :
          <blockquote className='blockquote mb-0'>
            <footer className='blockquote-footer'>Was feeling: {post.emotion}</footer>
          </blockquote>
        }
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
        <h1 className='mb-4'>{user.username}'s Posts</h1>
        <p>No posts found</p>
      </>
    )
  } else {
    return (
      <>
        <h1 className='mb-4'>{user.username}'s Posts</h1>
        {posts}
      </>
    )
  }
}