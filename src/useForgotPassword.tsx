import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { useOnUnmount } from './hooks'
import { ForgotPassState } from './typeDeclarations'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

interface ForgotOptions extends ActionOptions {
  redirectUrl?: string
}

function useForgotPassword(
  options: ForgotOptions = {},
): [ForgotPassState, (t: any) => Promise<any>] {
  const opts = getBaseOpts(options, 'forgotPassword')
  const [formState, fields] = useFormState()
  const [
    { saving: sending, saveError: error },
    { save, resetState },
  ] = useCroods(opts as InstanceOptions)

  useOnUnmount(resetState, !!(sending || error))

  const isFormValid = isValidForm(formState)

  const send = (data: any) => {
    const redirectUrl = options.redirectUrl || '/'
    return save({})({ redirectUrl, ...data })
  }

  const onSubmit = (event: Event) => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? send(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      formProps: { onSubmit },
      emailProps: fieldProps.apply(null, commonFields.email),
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

export default useForgotPassword
