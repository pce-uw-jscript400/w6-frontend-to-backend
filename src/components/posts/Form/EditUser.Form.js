import React from 'react'
import UserForm from './UserForm'

export default ({ onSubmit, user }) => (
  <section className='container'>
    <h1>Edit Your User Information</h1>
    <hr />
    <UserForm user={user} onSubmit={onSubmit} />
  </section>
)
