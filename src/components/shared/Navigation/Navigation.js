import React from 'react'

import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'

export default ({ currentUserName, currentUserId, logoutUser }) => (
  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      { 
        currentUserId 
        ? <AuthenticatedLinks currentUserName={currentUserName} currentUserId={currentUserId} logoutUser={logoutUser} /> 
        : <UnauthenticatedLinks /> 
      }
    </div>
  </section>
)
