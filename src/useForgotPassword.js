import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useOnUnmount from './useOnUnmount'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

export default (options = {}) => {
  const opts = getBaseOpts(options, 'forgotPassword')
  const [formState, fields] = useFormState()
  const [
    { saving: sending, saveError: error },
    { save, resetState },
  ] = useCroods(opts)

  useOnUnmount(resetState, sending || error)

  const isFormValid = isValidForm(formState)

  const send = data => {
    const redirectUrl = options.redirectUrl || '/'
    return save()({ redirectUrl, ...data })
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? send(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      formProps: { onSubmit },
      emailProps: fieldProps(...commonFields.email),
      fieldProps,
      fieldError,
      formState,
      isFormValid,
      sending,
      error,
    },
    send,
  ]
}
