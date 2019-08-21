import React from 'react'

import Actions from './List.Actions'

export default ({ destroyPost, user }) => {
  // I have used two different two slightly different variants of conditional rendering for question 1 and question 2 just to try out both approaches

  // Question 2 : If there is no emotion for a post, hide the associated message on each post.
  // Check the posts if emotion is populated, if so return the emotion as a blockquote, esle return nothing, thereby
  // conditionally rendering that field
  const displayEmotion = (post) => {
    if (post.emotion)
    {
      return (
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>Was feeling: { post.emotion }</footer>
        </blockquote>
      )
    }
  }

  const posts = user.posts.map(post => (
    <div key={post._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ post.content }</p>
        {displayEmotion(post)}
      </div>
      <Actions destroyPost={destroyPost} post={post} user={user} />
    </div>
  ))

  // Question 1: If there are no posts for a user, show a message on their `/users/<userId>/posts` page that encourages them to create a new post
  // Create a template to display when there are no posts to display for a given user
  const zeroPostText = () => {
    return (
      <div>
        <p>
          Hey, let's go ahead and create some posts
        </p>
      </div>
    )
  }

 // Check if there are any posts for a given user, if so go ahead and display their posts
 // If no posts are present for a given user, go ahead and show a text which encourages them to create a post
  return (
    <>
      <h1 className='mb-4'>{ user.username }'s Posts</h1>
      {(user.posts.length > 0) ? posts : zeroPostText()}

    </>
  )
}
