import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/password' } = options
  const [{ saving: sendingForgot, saveError: error }, { save }] = useCroods({
    ...getBaseOpts(options),
    name,
    path,
  })

  return [
    { sendingForgot, error },
    (email, redirectUrl) => save()({ email, redirectUrl }),
  ]
}
