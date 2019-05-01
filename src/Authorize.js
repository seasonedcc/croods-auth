import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useCurrentUser from './useCurrentUser'

const defaultLoading = 'Authorizing...'

const Authorize = ({
  Component,
  loading = defaultLoading,
  unauthorized,
  unauthorize,
  ...props
}) => {
  const [{ currentUser, fetchingUser }, setCurrentUser] = useCurrentUser(
    null,
    unauthorized,
  )

  useEffect(() => {
    if (unauthorize && currentUser) {
      unauthorize(currentUser) && unauthorized()
    }
  }, [currentUser, unauthorize, unauthorized])

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
  unauthorize: PropTypes.func,
  loading: PropTypes.element,
}

export default Authorize
