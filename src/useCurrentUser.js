import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}, autoFetch = true) => {
  const { name = 'auth', path = 'auth/validate_token' } = options
  const [{ info: currentUser, fetchingInfo }, { fetch }] = useCroods(
    { ...getBaseOpts(options), name, id: 'currentUser', path },
    autoFetch,
  )

  return [{ currentUser, fetchingUser: fetchingInfo }, fetch]
}
