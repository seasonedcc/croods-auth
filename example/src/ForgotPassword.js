import React from 'react'
import { navigate, Link } from '@reach/router'
import { useFormState } from 'react-use-form-state'
import { useForgotPassword } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ sendingForgot, sendError }, sendForgot] = useForgotPassword({
    stateId: 'forgot',
  })
  const [formState, { email }] = useFormState()

  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
        const sent = await sendForgot(formState.values.email, '/')
        sent && navigate(`${basePath}/forgot-sent`)
      }}
    >
      <h2>Forgot your password?</h2>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          {...email('email')}
          className={`form-control ${sendError && 'is-invalid'}`}
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        {sendError && <div className="invalid-feedback">{sendError}</div>}
      </div>
      <p>
        <Link to={`${basePath}/sign-in`}>{`Go back`}</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {sendingForgot ? 'Sending email...' : 'Send reset instructions'}
      </button>
    </form>
  )
}
