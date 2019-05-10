import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'
import { clearHeaders } from './persistHeaders'
import useMounted from './useMounted'

export default (options = {}) => {
  const opts = getBaseOpts(options, 'deleteAccount')
  const mounted = useMounted()
  const [
    {
      info: currentUser,
      destroying: deleting,
      destroyError: error,
      destroyed: deleted,
    },
    { destroy, setInfo },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      clearHeaders(opts)
      opts.afterSuccess && opts.afterSuccess(response)
      mounted && setInfo(null)
    },
  })

  return [
    { currentUser, deleting, deleted, error },
    destroy({ id: currentUser && currentUser.id }),
  ]
}
