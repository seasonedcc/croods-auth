import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import useFetchCurrentUser from './useFetchCurrentUser'

const defaultLoading = 'Authorizing...'

const Authorize = ({
  Component,
  authorizing = defaultLoading,
  unauthorized,
  unauthorize,
  ...props
}) => {
  const [{ currentUser, validating }, setCurrentUser] = useFetchCurrentUser({
    afterFailure: () => unauthorized(currentUser),
  })

  useLayoutEffect(() => {
    if (unauthorize && currentUser) {
      unauthorize(currentUser) && unauthorized(currentUser)
    }
  }, [currentUser, unauthorize, unauthorized])

  return validating || !currentUser ? (
    authorizing
  ) : (
    <Component
      {...props}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  )
}

Authorize.propTypes = {
  Component: PropTypes.elementType.isRequired,
  unauthorized: PropTypes.func.isRequired,
  unauthorize: PropTypes.func,
  authorizing: PropTypes.node,
}

export default Authorize
