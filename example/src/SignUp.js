import React from 'react'
import { useSignUp } from 'croods-auth'
import { Link, navigate } from '@reach/router'

import basePath from './basePath'
import Input from './Input'
import Error from './Error'
import { presence, minWords } from './validations'

export default ({ setAlert }) => {
  const [{ signingUp, error, ...options }] = useSignUp({
    stateId: 'signUp',
    afterSuccess: () => {
      navigate(`${basePath}/`)
      setAlert({ message: 'Successfully signed up', type: 'success' })
    },
  })
  const {
    emailProps,
    passwordProps,
    passwordConfirmationProps,
    fieldProps,
    formProps,
  } = options

  return (
    <form {...formProps}>
      <h2>Sign Up</h2>
      <Input
        {...fieldProps('text', 'name', [presence(), minWords(2)])}
        label="Full name"
      />
      <Input {...emailProps} label="Enter email">
        <small id="emailHelp" className="form-text text-muted">
          {`We'll never share your email with anyone else.`}
        </small>
      </Input>
      <Input {...passwordProps} />
      <Input {...passwordConfirmationProps} />
      <Error message={error} />
      <p>
        <Link to={`${basePath}/sign-in`}>Already have an account?</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {signingUp ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}
