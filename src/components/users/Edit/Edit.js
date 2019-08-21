import React from 'react'
import { withRouter } from 'react-router'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { userId, onSubmit } = this.props
    onSubmit(userId, this.state.username)
  }

  render () {
    return (
      <section className='container'>
        <h1>Edit Your Name</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              className='form-control'
              id='username'
              onChange={this.handleChange}
              name='username'
              type='text'
              value={this.state.name} />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </section>
    )
  }
}

export default withRouter(Edit)