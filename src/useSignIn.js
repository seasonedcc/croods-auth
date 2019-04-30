import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/sign_in' } = options
  const [
    { saving: signingIn, saved: signed, saveError: error },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [{ signingIn, signed, error }, save()]
}
