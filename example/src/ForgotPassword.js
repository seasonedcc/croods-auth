import React from 'react'
import { navigate, Link } from '@reach/router'
import { useForgotPassword } from 'croods-light-auth'

import Input from './Input'
import basePath from './basePath'

export default () => {
  const [{ sendingForgot, error, formProps, emailProps }] = useForgotPassword({
    stateId: 'forgot',
    redirectUrl: '/',
    afterSuccess: () => navigate(`${basePath}/forgot-sent`),
  })

  return (
    <form {...formProps}>
      <h2>Forgot your password?</h2>
      <Input {...emailProps} error={error} />
      <p>
        <Link to={`${basePath}/sign-in`}>{`Go back`}</Link>
      </p>
      <button type="submit" className="btn btn-primary">
        {sendingForgot ? 'Sending email...' : 'Send reset instructions'}
      </button>
    </form>
  )
}
