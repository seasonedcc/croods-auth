import { useCroods } from 'croods'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './persistHeaders'
import useMounted from './useMounted'
import useOnUnmount from './useOnUnmount'

export default (options = {}) => {
  const opts = { ...getBaseOpts(options, 'signOut'), operation: 'info' }
  const mounted = useMounted()
  const [
    { destroying: signingOut, destroyError: error },
    { destroy, setInfo, resetState },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      clearHeaders(opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  useOnUnmount(resetState)

  return [
    { signingOut, error },
    async callback => {
      await destroy()()
      if (typeof callback === 'function') callback()
      mounted && setInfo(null)
    },
  ]
}
