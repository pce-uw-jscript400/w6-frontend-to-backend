import React from 'react'
import Form from './Form'

export default ({ onSubmit, postError }) => (
  <section className='container'>
    <h1>Create a New Post</h1>
    {
      postError ? <span style={{color:'red'}}>Invalid post. Please try  again.</span>:""
    }

    <hr />
    <Form onSubmit={onSubmit} />
  </section>
)
