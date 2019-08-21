import React from 'react'

export default class UpdateForm extends React.Component {
  constructor (props) {
    super()
    this.state = { newname : "" }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const user = this.props.user
    this.props.onSubmit(this.state.newname, user._id)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='newname'>New Name</label>
          <textarea
            className='form-control'
            id='newname'
            onChange={this.handleChange}
            name='newname'
            type='text'
            value={this.state.newname} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}
