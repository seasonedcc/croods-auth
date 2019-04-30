import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [
    {
      info: currentUser,
      destroying: deleting,
      destroyError: error,
      destroyed: deleted,
    },
    { destroy },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [
    { currentUser, deleting, deleted, error },
    destroy(currentUser && currentUser.id),
  ]
}
