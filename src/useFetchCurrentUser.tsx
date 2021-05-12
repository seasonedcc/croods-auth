import { useState, useEffect, useCallback } from 'react'
import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { getHeaders } from './headersHelpers'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import { UseFetchCurrentUserType, UserStatus } from './typeDeclarations'

function useFetchCurrentUser(
  options: ActionOptions,
): UseFetchCurrentUserType {
  const opts = getBaseOpts(
    { cache: true, operation: 'info', ...options },
    'currentUser',
  ) as InstanceOptions

  const [{ info, fetchingInfo, infoError }, actions] = useCroods(opts)
  const [status, setStatus] = useState('pending' as UserStatus)

  const initFetch = useCallback(() => {
    const headers = getHeaders(opts)
    if (headers.accessToken) {
      actions.fetch({})()
    } else {
      setStatus('visitor')
      opts.afterFailure && opts.afterFailure({})
    }
  }, [actions, opts])

  useEffect(() => {
    if (info) {
      setStatus('loggedIn')
    } else {
      initFetch()
    }
  }, [info])

  return [
    { currentUser: info, status, validating: !!fetchingInfo, error: infoError },
    actions.setInfo,
  ]
}

export default useFetchCurrentUser
