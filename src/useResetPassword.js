import { useCroods } from 'croods-light'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/password' } = options
  const [{ saving: reseting, saveError: error }, { save }] = useCroods({
    ...getBaseOpts(options),
    name,
    path,
  })

  return [
    { reseting, error },
    (values, location = window.location) => {
      const params = new URLSearchParams(location.search)
      const resetPasswordToken = params.get('reset_password_token')
      save(true)({ ...values, resetPasswordToken })
    },
  ]
}
