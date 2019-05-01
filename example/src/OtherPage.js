import React from 'react'
import { navigate, Link } from '@reach/router'
import { useCurrentUser } from 'croods-light-auth'

import basePath from './basePath'

export default () => {
  const [{ currentUser }, setCurrentUser] = useCurrentUser(null, () =>
    navigate(`${basePath}/sign-in`),
  )

  return (
    <div>
      <h2>
        {currentUser
          ? `Still logged in as ${currentUser.email}`
          : 'Not logged in'}
      </h2>
      {currentUser && (
        <button
          className="btn btn-primary"
          onClick={() => setCurrentUser({ email: 'foo@bar.com' }, true)}
        >
          Change user email
        </button>
      )}
      <p>
        <Link to={`${basePath}/`}>Back to Homepage</Link>
      </p>
    </div>
  )
}
