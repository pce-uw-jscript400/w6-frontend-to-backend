import React from 'react'
import { withRouter } from 'react-router'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
        .then(() =>
        this.props.history.push('/users'))
        window.location.reload()
  }

  render () {
    return (
    <main className='container'>
        <section className='row justify-content-md-center'>
            <div className='col col-lg-5'>
                <h1>Edit Your Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                    <label htmlFor='username'>Name</label>
                    <input
                        className='form-control'
                        id='username'
                        onChange={this.handleChange}
                        name='username'
                        type='text'
                        value={this.state.username} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </section>
    </main>
    )
  }
}

export default withRouter(Edit)