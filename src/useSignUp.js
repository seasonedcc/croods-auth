import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useOnUnmount from './useOnUnmount'
import { saveHeaders } from './persistHeaders'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

export default (options = {}) => {
  const [formState, fields] = useFormState()
  const opts = getBaseOpts(options, 'signUp')
  const [
    { saving: signingUp, saveError: error },
    { save, setInfo, resetState },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      saveHeaders(response, opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  useOnUnmount(resetState)

  const isFormValid = isValidForm(formState)

  const signUp = async data => {
    const saved = await save()(data)
    saved && setInfo(saved)
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? signUp(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      emailProps: fieldProps(...commonFields.email),
      passwordProps: fieldProps(...commonFields.password),
      passwordConfirmationProps: fieldProps(
        ...commonFields.passwordConfirmation,
      ),
      formProps: { onSubmit },
      fieldProps,
      fieldError,
      formState,
      isFormValid,
      signingUp,
      error,
    },
    signUp,
  ]
}
