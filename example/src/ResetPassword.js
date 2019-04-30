import React from 'react'
import { navigate, Link } from '@reach/router'
import { useResetPassword } from 'croods-light-auth'

import Input from './Input'
import basePath from './basePath'

export default () => {
  const [{ reseting, error, ...props }] = useResetPassword({
    afterSuccess: () => navigate(`${basePath}/`),
  })
  const { formProps, passwordProps, passwordConfirmationProps } = props

  return (
    <form {...formProps}>
      <h2>Reset Password</h2>
      <Input {...passwordProps} />
      <Input {...passwordConfirmationProps} error={error} />
      <p>
        <Link to={`${basePath}/sign-in`}>{`Go to Sign In`}</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {reseting ? 'Reseting...' : 'Reset!'}
      </button>
    </form>
  )
}
