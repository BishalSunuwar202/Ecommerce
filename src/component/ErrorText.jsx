import React from 'react'

export default function ErrorText({errors, field, data, }) {
    if(!errors[field] ) {
      return null; 
    }
    
  return (
    <small className = "text-danger"> {errors[field]} </small>
  )
}

