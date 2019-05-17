import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './persistHeaders'
import useMounted from './useMounted'

export default (options = {}) => {
  const opts = { ...getBaseOpts(options, 'signOut'), operation: 'info' }
  const mounted = useMounted()
  const [
    { info: currentUser, destroying: signingOut, destroyError: error },
    { destroy, setInfo },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      clearHeaders(opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  return [
    { currentUser, signingOut, error },
    async callback => {
      await destroy()()
      if (typeof callback === 'function') callback()
      mounted && setInfo(null)
    },
  ]
}
