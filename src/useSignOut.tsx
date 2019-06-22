import { useCroods } from 'croods'
import { ActionOptions } from 'croods/dist/types/typeDeclarations'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './headersHelpers'
import { useMounted, useOnUnmount } from './hooks'

export default (options: ActionOptions = {}): [object, (Function) => void] => {
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
      await destroy({})()
      if (typeof callback === 'function') callback()
      mounted && setInfo(null, false)
    },
  ]
}
