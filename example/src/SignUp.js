import React from 'react'
import { useSignUp } from 'croods-light-auth'
import { Link, navigate } from '@reach/router'

import basePath from './basePath'
import Input from './Input'

export default () => {
  const [{ signingUp, signUpError, error, ...options }] = useSignUp({
    stateId: 'signUp',
    afterSuccess: () => navigate(`${basePath}/`),
  })
  const {
    emailProps,
    passwordProps,
    passwordConfirmationProps,
    fields,
    formProps,
  } = options

  return (
    <form {...formProps}>
      <h2>Sign Up</h2>
      <Input {...fields.text('name')} label="Full name" />
      <Input {...emailProps} label="Enter email">
        <small id="emailHelp" className="form-text text-muted">
          {`We'll never share your email with anyone else.`}
        </small>
      </Input>
      <Input {...passwordProps} />
      <Input {...passwordConfirmationProps} error={error} />
      <p>
        <Link to={`${basePath}/sign-in`}>Already have an account?</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {signingUp ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}
