import React from 'react'
import {withRouter} from 'react-router-dom';

class Form extends React.Component {
  constructor (props) {
    super(props)
    const { user = {} } = this.props
    this.state = { name: user.name }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.props.user, {name: this.state.name})
    this.props.history.push(`/users/${this.props.user._id}/posts`);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Username</label>
          <input
            className='form-control'
            id='name'
            onChange={this.handleChange}
            name='name'
            type='text'
            //value={this.state.name} 
          />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)
