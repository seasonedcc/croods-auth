import React from 'react'
import { CroodsProvider } from 'croods-light'
import { Router } from '@reach/router'

import basePath from './basePath'
import Start from './Start'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import ForgotSent from './ForgotSent'
import ResetPassword from './ResetPassword'

export default () => (
  <CroodsProvider debugActions baseUrl={process.env.REACT_APP_API_URL}>
    <Router basepath={basePath}>
      <Start path="/" />
      <SignIn path="/sign-in" />
      <SignUp path="/sign-up" />
      <ForgotSent path="/forgot-sent" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password" />
    </Router>
  </CroodsProvider>
)
