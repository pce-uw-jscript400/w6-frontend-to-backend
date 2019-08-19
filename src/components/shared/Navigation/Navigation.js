import React from 'react'

import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'

export default ({ user, currentUserId, logoutUser, signUpUser }) => (
  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      {
        currentUserId
        ? (<AuthenticatedLinks
          user={user}
          currentUserId={currentUserId}
          logoutUser={logoutUser}
          signUpUser={signUpUser}
          />)
        : <UnauthenticatedLinks />
      }
    </div>
  </section>
)
