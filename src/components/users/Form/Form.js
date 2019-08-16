import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)

    const { user = {} } = this.props
    console.log(user)
    const { name = '', _id='' } = user
    this.state = { name, _id }
    console.log(name)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state)
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='emotion'>Username</label>
          <input
            className='form-control'
            id='username'
            onChange={this.handleChange}
            name='name'
            type='text'
            value={this.state.name} />
        </div>

        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}
