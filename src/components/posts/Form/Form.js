import React from 'react'
import {withRouter} from 'react-router-dom'
import ErrorMessage from '../../shared/ErrorMsg';

class Form extends React.Component {
  constructor (props) {
    super(props)
    const { post = {} } = this.props
    const { content = '', emotion = '' } = post
    this.state = { 
      content, 
      emotion,
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
    const response = await this.props.onSubmit(this.props.user, {content: this.state.content, emotion: this.state.emotion})
    if (response.error = true) {
      this.setState({
        error: true,
        errorMsg: response.message
      })
      return
    }
    console.log(this.props.history)
    this.props.history.push('/users')
  }

  render () {
    let error;
    if(this.state.error) {
      error = <ErrorMessage message={this.state.errorMsg}/>
    } 
    
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
        {error}
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)