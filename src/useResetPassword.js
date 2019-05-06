import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const {
    name = 'auth',
    path = 'auth/password',
    location = window.location,
  } = options
  const [formState, { password }] = useFormState()
  const [{ saving: reseting, saveError: error }, { save }] = useCroods({
    ...getBaseOpts(options),
    name,
    path,
  })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const params = new URLSearchParams(location.search)
    const resetPasswordToken = params.get('reset_password_token')
    save(true)({ ...formState.values, resetPasswordToken })
  }

  return [
    {
      reseting,
      error,
      formState,
      passwordProps: password('password'),
      passwordConfirmationProps: password('passwordConfirmation'),
      formProps: { onSubmit },
    },
    onSubmit,
  ]
}
