import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { post = {} } = this.props
    const { content = '', emotion = '' } = post
    this.state = { content, emotion }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.props.user, this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='emotion'>Emotion</label>
          <input
            className='form-control'
            id='emotion'
            onChange={this.handleChange}
            name='emotion'
            type='text'
            value={this.state.emotion} />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Content</label>
          <textarea
            className='form-control'
            id='content'
            onChange={this.handleChange}
            name='content'
            type='text'
            value={this.state.content} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}
