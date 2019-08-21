import React from 'react'

import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'

export default ({ currentUserId , username, logoutUser}) => (
  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      {
        currentUserId
        ? <AuthenticatedLinks
        currentUserId = {currentUserId}
        username = {username} // (Q3, Q5) : Pass the username prop to the AuthenticatedLinks component
        logoutUser = {logoutUser}
         />
        : <UnauthenticatedLinks />
      }
    </div>
  </section>
)
