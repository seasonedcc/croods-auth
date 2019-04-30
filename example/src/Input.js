import React from 'react'
import startCase from 'lodash/startCase'

export default ({
  children,
  name,
  error,
  label = startCase(name),
  placeholder = label,
  ...props
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      {...props}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={name}
      placeholder={placeholder}
    />
    {error && <div className="invalid-feedback">{error}</div>}
    {children}
  </div>
)
