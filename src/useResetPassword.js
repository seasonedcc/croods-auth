import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { location = window.location } = options
  const opts = getBaseOpts(options)
  const [formState, { password }] = useFormState()
  const [{ saving: reseting, saveError: error }, { save }] = useCroods(opts)

  const reset = save({ method: 'PUT' })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const params = new URLSearchParams(location.search)
    const resetPasswordToken = params.get('reset_password_token')
    reset({ ...formState.values, resetPasswordToken })
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
    reset,
  ]
}
