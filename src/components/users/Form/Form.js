import React from 'react'

export default class Form extends React.Component {
    constructor (props) {
      super(props)
      const { user = {} } = this.props
      console.log(user)
      const { name } = user
      this.state = { name }
  
    //   this.handleChange = this.handleChange.bind(this)
    //   this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        const { user } = this.props
    
        if (user._id) {
          const body = Object.assign({}, this.state, { _id: user._id })
          this.props.onSubmit(body)
        } else {
          this.props.onSubmit(this.state)
        }
      }

    render () {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='emotion'>Name</label>
              <input
              className='form-control'
              id='name'
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