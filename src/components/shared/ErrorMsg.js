import React from 'react'

const ErrorMessage = (props) => {
  return(
    <div className="alert alert-danger">
      <p className="mb-0">{props.message}</p>
    </div>
  )
}

export default ErrorMessage