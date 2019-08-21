import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyPost, user, post}) => {


  return (
    <>
      <h1 className='mb-4'>Post ID: {post._id}</h1>
      <h2>Created by: {user.name}</h2>
      <div key={post._id} className='card'>
      <div className='card-body'>
      <p className='card-text'>{ post.content }</p>
        <blockquote className='blockquote mb-0'>
        {
          post.emotion ?

            <footer className='blockquote-footer'>Was feeling: { post.emotion }</footer>

          : null
        }
        </blockquote>
      </div>
      <Actions
        currentUserId={currentUserId}
        destroyPost={destroyPost}
        post={post}
        user={user} />
    </div>

    </>
  )
}