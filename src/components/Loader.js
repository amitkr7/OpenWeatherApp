import React from 'react'

const Loader = ({ message }) => {
  return (
    <div>
      <div className='loader'></div>
      <div className='loader-text'>{message}</div>
    </div>
  )
}

export default Loader
