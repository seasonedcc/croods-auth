import React from 'react'
import { CroodsProvider } from 'croods-light'
import { Auth } from 'croods-light-auth'
import { Router, navigate } from '@reach/router'

import basePath from './basePath'
import Start from './Start'
import OtherPage from './OtherPage'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import ForgotSent from './ForgotSent'
import ResetPassword from './ResetPassword'

const redirect = path => () => navigate(`${basePath}${path}`)

export default () => (
  <CroodsProvider debugActions baseUrl={process.env.REACT_APP_API_URL}>
    <Router basepath={basePath}>
      <Auth Component={Start} path="/" unauthorized={redirect('/sign-in')} />
      <Auth
        Component={OtherPage}
        unauthorized={redirect('/')}
        unauthorize={currentUser => currentUser.email === 'foo@bar.com'}
        path="/other-page"
      />
      <SignIn path="/sign-in" />
      <SignUp path="/sign-up" />
      <ForgotSent path="/forgot-sent" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password" />
    </Router>
  </CroodsProvider>
)
