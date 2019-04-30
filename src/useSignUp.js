import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [
    { saving: signingUp, saved: signedUp, saveError: error },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [{ signingUp, signedUp, error }, save()]
}
