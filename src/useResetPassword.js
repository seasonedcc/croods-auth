import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

const DEFAULT_KEY = 'reset_password_token'

export default (options = {}) => {
  const { location = window.location, tokenKey = DEFAULT_KEY } = options
  const opts = getBaseOpts(options)
  const [formState, fields] = useFormState()
  const [{ saving: reseting, saveError: error }, { save }] = useCroods(opts)

  const isFormValid = isValidForm(formState)

  const reset = save({ method: 'PUT' })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const params = new URLSearchParams(location.search)
    const token = params.get(tokenKey)
    return isFormValid
      ? reset({ ...formState.values, [DEFAULT_KEY]: token })
      : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      passwordProps: fieldProps(...commonFields.password),
      passwordConfirmationProps: fieldProps(
        ...commonFields.passwordConfirmation,
      ),
      formProps: { onSubmit },
      fieldProps,
      fieldError,
      isFormValid,
      formState,
      reseting,
      error,
    },
    reset,
  ]
}
