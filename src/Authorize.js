import React from 'react'
import PropTypes from 'prop-types'
import useCurrentUser from './useCurrentUser'

const defaultLoading = 'Authorizing...'

const Authorize = ({
  Component,
  loading = defaultLoading,
  unauthorized,
  ...props
}) => {
  const [{ currentUser, fetchingUser }, setCurrentUser] = useCurrentUser(
    null,
    unauthorized,
  )
  return fetchingUser || !currentUser ? (
    loading
  ) : (
    <Component
      {...props}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  )
}

Authorize.propTypes = {
  Component: PropTypes.func.isRequired,
  unauthorized: PropTypes.func.isRequired,
  loading: PropTypes.element,
}

export default Authorize
