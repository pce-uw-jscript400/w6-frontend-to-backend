import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.props.history.push('/users')
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            className='form-control'
            id='username'
            onChange={this.handleChange}
            name='username'
            type='text'
            value={this.state.username} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            onChange={this.handleChange}
            name='password'
            type='password'
            value={this.state.password} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
        {this.state.error && 
          <div className="errorMessage" 
            style={{ 
              marginTop: 20,
              padding: 10, 
              backgroundColor: '#dc3545', 
              color: 'white', 
              }}>
                Error: Please enter a valid username and password.
          </div>
        }
      </form>
    )
  }
}

export default withRouter(Form)