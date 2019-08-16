import React from 'react'
import Form from './Form'

export default ({ onSubmit, user }) => (
  <section className='container'>
    <h1>Edit Your Name</h1>

    <hr />
    <Form user={user} onSubmit={onSubmit} />
  </section>
)
