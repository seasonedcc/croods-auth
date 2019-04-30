import React from 'react'
import { Link } from '@reach/router'
import basePath from './basePath'

const TOKEN = 'RYe9xcWxdisyxFrzZuWN'

export default () => (
  <div>
    <h2>An email with instructions was sent to you!</h2>
    <Link to={`${basePath}/reset-password?reset_password_token=${TOKEN}`}>
      Simulate reset
    </Link>
  </div>
)
