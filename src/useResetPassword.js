import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

const DEFAULT_KEY = 'reset_password_token'

export default (options = {}) => {
  const { location = window.location, tokenKey = DEFAULT_KEY } = options
  const opts = getBaseOpts(options)
  const [formState, fields] = useFormState()
  const [{ saving: reseting, saveError: error }, { save }] = useCroods(opts)

  const reset = save({ method: 'PUT' })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const params = new URLSearchParams(location.search)
    const token = params.get(tokenKey)
    reset({ ...formState.values, [DEFAULT_KEY]: token })
  }

  return [
    {
      reseting,
      error,
      formState,
      passwordProps: fields.password('password'),
      passwordConfirmationProps: fields.password('passwordConfirmation'),
      formProps: { onSubmit },
      fields,
    },
    reset,
  ]
}
