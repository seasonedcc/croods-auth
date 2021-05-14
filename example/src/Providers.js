import React, { Fragment } from 'react'
import { CroodsProvider } from 'croods'
import { authHeaders, AuthProvider, saveHeaders } from 'croods-auth'

const Providers = ({ children }) => {
  return (
    <Fragment>
      <CroodsProvider
        handleResponseHeaders={saveHeaders}
        headers={authHeaders}
        debugActions
        debugRequests
        baseUrl={process.env.REACT_APP_API_URL}
      >
        <AuthProvider>{children}</AuthProvider>
      </CroodsProvider>
    </Fragment>
  )
}

export default Providers
