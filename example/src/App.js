import React from 'react'
import { CroodsProvider } from 'croods-light'
import { Router } from '@reach/router'

import basePath from './basePath'
import Start from './Start'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default () => (
  <CroodsProvider debugActions baseUrl={process.env.REACT_APP_API_URL}>
    <Router basepath={basePath}>
      <Start path="/" />
      <SignIn path="/sign-in" />
      <SignUp path="/sign-up" />
    </Router>
  </CroodsProvider>
)
