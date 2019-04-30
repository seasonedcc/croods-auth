import React from 'react'
import { navigate, Link } from '@reach/router'
import { useFormState } from 'react-use-form-state'
import { useSignUp } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ signingUp, signUpError }, signUp] = useSignUp({ stateId: 'signUp' })
  const [formState, { text, email, password }] = useFormState()

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        const signed = await signUp(formState.values)
        signed && navigate(`${basePath}/`)
      }}
    >
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          {...text('name')}
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          {...email('email')}
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          {`We'll never share your email with anyone else.`}
        </small>
      </div>
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
        <label htmlFor="passwordConfirmation">Password</label>
        <input
          {...password('passwordConfirmation')}
          className={`form-control ${signUpError && 'is-invalid'}`}
          id="passwordConfirmation"
          placeholder="Confirm Password"
        />
        {signUpError && <div className="invalid-feedback">{signUpError}</div>}
      </div>
      <p>
        <Link to={`${basePath}/sign-in`}>Already have an account?</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {signingUp ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}
