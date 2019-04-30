import React from 'react'
import { navigate, Link } from '@reach/router'
import { useFormState } from 'react-use-form-state'
import { useSignIn, useForgotPassword } from 'croods-light-auth'

export default () => {
  const [{ signInIn, signInError }, signIn] = useSignIn()
  const [{ sendingForgot }, sendForgot] = useForgotPassword({
    stateId: 'forgot',
  })
  const [formState, { email, password }] = useFormState()

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        const signed = await signIn(formState.values)
        signed && navigate('/')
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
        <label htmlFor="password">Confirm password</label>
        <input
          {...password('password')}
          className={`form-control ${signInError && 'is-invalid'}`}
          id="password"
          placeholder="Password"
        />
        {signInError && <div className="invalid-feedback">{signInError}</div>}
      </div>
      <p>
        <Link to="/sign-up">{`Don't have an account?`}</Link>
      </p>
      <p>
        {sendingForgot ? (
          'Sending...'
        ) : (
          <a
            href="#"
            onClick={() => sendForgot(formState.values.email, '/')}
          >{`Forgot your password?`}</a>
        )}
      </p>
      <button type="submit" className="btn btn-primary">
        {signInIn ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
