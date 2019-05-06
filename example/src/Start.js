import React from 'react'
import { Link } from '@reach/router'
import { useSignOut, useDeleteAccount } from 'croods-light-auth'

import basePath from './basePath'

export default ({ currentUser }) => {
  const [{ signingOut }, signOut] = useSignOut()
  const [{ deleting }, deleteAccount] = useDeleteAccount()

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Logged in as {currentUser.email}</h2>
      <p>
        <Link to={`${basePath}/edit-profile`}>Edit Profile</Link>
      </p>
      <button className="btn btn-primary" onClick={signOut}>
        {signingOut ? 'Signing Out...' : 'Sign Out'}
      </button>{' '}
      <button
        className="btn btn-danger"
        onClick={() => {
          // eslint-disable-next-line
          const shouldDelete = window.confirm('Are you sure?')
          shouldDelete && deleteAccount()
        }}
      >
        {deleting ? 'Deleting account...' : 'Delete account'}
      </button>
      <p style={{ marginTop: '1rem' }}>
        <Link to={`${basePath}/other-page`}>Go to other page</Link>
      </p>
    </div>
  )
}