import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { saveHeaders } from './persistHeaders'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

export default (options = {}) => {
  const [formState, fields] = useFormState()
  const opts = getBaseOpts(options, 'signIn')
  const [
    { saving: signingIn, saveError: error },
    { save, setInfo },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      saveHeaders(response, opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  const isFormValid = isValidForm(formState)

  const signIn = async data => {
    const saved = await save()(data)
    saved && setInfo(saved)
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? signIn(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      emailProps: fieldProps(...commonFields.email),
      passwordProps: fieldProps(...commonFields.password),
      formProps: { onSubmit },
      fieldProps,
      fieldError,
      formState,
      isFormValid,
      signingIn,
      error,
    },
    signIn,
  ]
}
