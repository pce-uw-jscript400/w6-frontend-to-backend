import React from 'react'
import { Link } from 'react-router-dom'

export default ({ post }) => {

  return (
    <>
      <h1 className='mb-4'>Post</h1>
      <div key={post._id} className='card'>
        <div className='card-body'>
          <p className='card-text'>{ post.content }</p>
          <blockquote className='blockquote mb-0'>
          {post.emotion !== '' ?
              <footer className='blockquote-footer'> Was feeling: ${post.emotion}</footer> : ''}
          </blockquote>
        </div>
      </div>
    </>
  )
}
