import React from 'react'
import { Link } from '@reach/router'

import basePath from './basePath'

export default ({ currentUser, setCurrentUser }) => (
  <div style={{ textAlign: 'center' }}>
    <h2>Still logged in as {currentUser.email}</h2>
    {currentUser && (
      <button
        className="btn btn-primary"
        onClick={() => setCurrentUser({ email: 'foo@bar.com' }, true)}
      >
        Change user email to a blocked user
      </button>
    )}
    <p style={{ marginTop: '1rem' }}>
      <Link to={`${basePath}/`}>Back to Homepage</Link>
    </p>
  </div>
)
