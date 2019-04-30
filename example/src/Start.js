import React from 'react'
import { navigate } from '@reach/router'
import { useSignOut, useDeleteAccount, useCurrentUser } from 'croods-light-auth'

export default () => {
  const [{ currentUser }] = useCurrentUser()
  const [{ signInOut }, signOut] = useSignOut()
  const [{ deletingAccount }, deleteAccount] = useDeleteAccount({
    stateId: 'delete',
  })

  return currentUser ? (
    <div>
      <p>Logged in as {currentUser.name}</p>
      <button className="btn btn-primary" onClick={signOut}>
        {signInOut ? 'Signing Out...' : 'Sign Out'}
      </button>{' '}
      <button
        className="btn btn-danger"
        onClick={() => {
          const shouldDelete = window.confirm('Are you sure?')
          shouldDelete && deleteAccount()
        }}
      >
        {deletingAccount ? 'Deleting account...' : 'Delete account'}
      </button>
    </div>
  ) : (
    <div>
      <p>You are not logged in...</p>
      <button className="btn btn-primary" onClick={() => navigate('sign-in')}>
        Go to Sign In Page
      </button>
    </div>
  )
}
