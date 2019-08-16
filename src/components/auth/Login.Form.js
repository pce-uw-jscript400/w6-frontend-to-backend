import React from 'react'
import Form from './Form'
import { withRouter } from 'react-router'

export default ({ onSubmit, showAlert }) => (
  <main className='container'>
    <section className='row justify-content-md-center'>
      <div className='col col-lg-5'>
        <h1>Login</h1>
        {
          showAlert ? <div className="login-alert" style={{color:'red', fontWeight:'bold'}}>Your credentials are incorrect. Please try again.</div> : <div></div>
        }
        <Form onSubmit={onSubmit} />
      </div>
    </section>
  </main>
)
