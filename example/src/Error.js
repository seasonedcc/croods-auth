import React from 'react'

export default ({ message }) =>
  message ? <span style={{ color: 'red' }}>{message}</span> : null
