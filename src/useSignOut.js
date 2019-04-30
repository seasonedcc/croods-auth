import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/sign_out' } = options
  const [
    {
      info: currentUser,
      destroyed: signedOut,
      destroying: signingOut,
      destroyError: error,
    },
    { destroy },
  ] = useCroods({
    ...getBaseOpts(options),
    name,
    id: 'currentUser',
    path,
  })

  return [
    { currentUser, signingOut, signedOut, error },
    destroy(currentUser && currentUser.id),
  ]
}
