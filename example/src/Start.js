import React from 'react'
import { Link, navigate } from '@reach/router'
import { useSignOut, useDeleteAccount } from 'croods-auth'

import basePath from './basePath'

export default ({ currentUser }) => {
  const [{ signingOut }, signOut] = useSignOut()
  const [{ deleting }, deleteAccount] = useDeleteAccount()
  const afterSignOut = () => navigate(`${basePath}/sign-in`)

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Logged in as {currentUser.email}</h2>
      <p>
        <Link to={`${basePath}/edit-profile`}>Edit Profile</Link>
      </p>
      <button className="btn btn-primary" onClick={() => signOut(afterSignOut)}>
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
