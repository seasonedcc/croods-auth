import { useEffect, useCallback } from 'react'
import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { getHeaders } from './persistHeaders'

export default options => {
  const opts = getBaseOpts(
    { cache: true, operation: 'info', ...options },
    'currentUser',
  )
  const [{ info: currentUser, fetchingInfo }, actions] = useCroods(opts)

  const initFetch = useCallback(() => {
    const headers = getHeaders(opts)
    if (headers.accessToken) {
      actions.fetch()()
    } else {
      opts.afterFailure && opts.afterFailure({})
    }
  }, [actions, opts])

  useEffect(() => {
    currentUser || initFetch()
    // eslint-disable-next-line
  }, [currentUser])

  return [{ currentUser, validating: fetchingInfo }, actions.setInfo]
}
