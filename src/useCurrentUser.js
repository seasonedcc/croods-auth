import { useEffect } from 'react'
import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options, callback) => {
  const { name = 'auth', path = 'auth/validate_token' } = options || {}
  const [{ info: currentUser, fetchingInfo }, { fetch, setInfo }] = useCroods({
    ...getBaseOpts(options),
    afterFailure: callback,
    cache: true,
    name,
    id: 'currentUser',
    path,
  })

  useEffect(() => {
    currentUser || fetch('currentUser')
    // eslint-disable-next-line
  }, [currentUser])

  return [{ currentUser, fetchingUser: fetchingInfo }, setInfo]
}
