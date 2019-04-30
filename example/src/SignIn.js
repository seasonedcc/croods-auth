import React from 'react'
import { navigate, Link } from '@reach/router'
import { useFormState } from 'react-use-form-state'
import { useSignIn } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ signingIn, signInError }, signIn] = useSignIn()
  const [formState, { email, password }] = useFormState()

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        const signed = await signIn(formState.values)
        signed && navigate(`${basePath}/`)
      }}
    >
      <h2>Sign In</h2>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          {...email('email')}
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...password('password')}
          className={`form-control ${signInError && 'is-invalid'}`}
          id="password"
          placeholder="Password"
        />
        {signInError && <div className="invalid-feedback">{signInError}</div>}
      </div>
      <p>
        <Link to={`${basePath}/sign-up`}>{`Don't have an account?`}</Link>
      </p>
      <p>
        <Link to={`${basePath}/forgot-password`}>Forgot your password?</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {signingIn ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
