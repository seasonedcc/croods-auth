import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './headersHelpers'
import { useMounted, useOnUnmount } from './hooks'

export default (options = {}) => {
  const opts = getBaseOpts(options, 'deleteAccount')
  const mounted = useMounted()
  const [
    { info: currentUser, destroying: deleting, destroyError: error },
    { destroy, setInfo, resetState },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      clearHeaders(opts)
      opts.afterSuccess && opts.afterSuccess(response)
      mounted && setInfo(null)
    },
  })

  useOnUnmount(resetState, deleting || error)

  return [{ deleting, error }, destroy({ id: currentUser && currentUser.id })]
}
