import React from 'react'
import Form from './Form'

export default ({ onSubmit, displayError }) => (
  <main className='container'>
    <section className='row justify-content-md-center'>
      <div className='col col-lg-5'>
        <h1>Signup</h1>
        {
          displayError ? <span style={{color:'red'}}>Invalid credentials. Please try signing in again</span>:""
        }

        <Form onSubmit={onSubmit} />
      </div>
    </section>
  </main>
)
