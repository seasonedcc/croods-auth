import { useEffect, useCallback } from 'react'
import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'
import { getHeaders } from './persistHeaders'

export default (options, callback) => {
  const opts = {
    ...getBaseOpts(options, 'currentUser'),
    afterFailure: callback,
    cache: true,
    operation: 'info',
  }
  const [{ info: currentUser, fetchingInfo }, { fetch, setInfo }] = useCroods(
    opts,
  )

  const initFetch = useCallback(() => {
    const headers = getHeaders(opts)
    if (headers.accessToken) {
      fetch()()
    } else {
      callback && callback()
    }
  }, [callback, fetch, opts])

  useEffect(() => {
    currentUser || initFetch()
    // eslint-disable-next-line
  }, [currentUser])

  return [{ currentUser, fetchingUser: fetchingInfo }, setInfo]
}
