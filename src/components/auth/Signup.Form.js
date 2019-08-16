import React from 'react'
import Form from './Form'

export default ({ onSubmit, showAlert }) => (
  <main className='container'>
    <section className='row justify-content-md-center'>
      <div className='col col-lg-5'>
        <h1>Signup</h1>
        {
          showAlert ? <div className="login-alert" style={{color:'red', fontWeight:'bold'}}>Username already exists. Please enter a different username and try again.</div> : <div></div>
        }
        <Form onSubmit={onSubmit} />
      </div>
    </section>
  </main>
)
