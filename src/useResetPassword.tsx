import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { useOnUnmount } from './hooks'
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
import { ResetPassState } from './typeDeclarations'

const DEFAULT_KEY = 'reset_password_token'

interface ResetOptions extends ActionOptions {
  location?: Location
  tokenKey?: string
}

function useResetPassword(
  options: ResetOptions = {},
): [ResetPassState, (b?: object) => Promise<any>] {
  const { location = window.location, tokenKey = DEFAULT_KEY } = options
  const opts = getBaseOpts(options, 'resetPassword') as InstanceOptions
  const [formState, fields] = useFormState()
  const [
    { saving: reseting, saveError: error },
    { save, resetState },
  ] = useCroods(opts)

  useOnUnmount(resetState, !!(reseting || error))

  const isFormValid = isValidForm(formState)

  const reset = save({ method: 'PUT' })

  const onSubmit = (event: Event) => {
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
      passwordProps: fieldProps.apply(null, commonFields.password),
      passwordConfirmationProps: fieldProps.apply(
        null,
        commonFields.passwordConfirmation,
      ),
      formProps: { onSubmit },
      fieldProps,
      fieldError,
      isFormValid,
      formState,
      reseting: !!reseting,
      error,
    },
    reset,
  ]
}

export default useResetPassword
