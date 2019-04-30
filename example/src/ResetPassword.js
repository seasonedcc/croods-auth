import React from 'react'
import { navigate, Link } from '@reach/router'
import { useFormState } from 'react-use-form-state'
import { useResetPassword } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ reseting, error }, reset] = useResetPassword()
  const [formState, { password }] = useFormState()

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        const signed = await reset(formState.values)
        signed && navigate(`${basePath}/`)
      }}
    >
      <h2>Reset Password</h2>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...password('password')}
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm password</label>
        <input
          {...password('passwordConfirmation')}
          className={`form-control ${error && 'is-invalid'}`}
          id="passwordConfirmation"
          placeholder="Password Confirmation"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <p>
        <Link to={`${basePath}/sign-in`}>{`Go to Sign In`}</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {reseting ? 'Reseting...' : 'Reset!'}
      </button>
    </form>
  )
}
