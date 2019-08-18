import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { post = {} } = this.props
    const { content = '', emotion = '' } = post
    this.state = { content, emotion, error: false }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { post } = this.props

    console.log(this.state.emotion)
    console.log(this.state.content)

    if ((this.state.content === '') && (this.state.emotion === '')) {
      this.setState({ error: true })
    } else {
      if (post && post._id) {
        const body = Object.assign({}, this.state, { _id: post._id })
        this.props.onSubmit(body)
      } else {
        this.props.onSubmit(this.state)
      }
    }
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
        {this.state.error && 
          <div className="errorMessage" 
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#dc3545',
              color: 'white',
              }}>
                Error: Please enter an emotion or content.
          </div>}
      </form>
    )
  }
}
