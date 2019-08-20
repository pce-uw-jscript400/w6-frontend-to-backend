import React from 'react'
import {withRouter} from 'react-router'
import ErrorMessage from '../shared/ErrorMsg';


class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMsg: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    const response = await this.props.onSubmit(this.state)
    console.log(response)
    if (response.status !== 200) {
      this.setState({
        error: true,
        errorMsg: response.message
      })
    }
  }

  render () {
    let error;
    if(this.state.error) {
      error = <ErrorMessage message={this.state.errorMsg}/>
    }
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
        {error}
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)