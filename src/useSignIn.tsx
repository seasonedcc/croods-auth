import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { useOnUnmount } from './hooks'
import { saveHeaders } from './headersHelpers'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import { AxiosResponse } from 'axios'
import { SignInState } from './typeDeclarations'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

function useSignIn(
  options: ActionOptions = {},
): [SignInState, (a: object) => Promise<void>] {
  const [formState, fields] = useFormState()

  const afterSuccess = (response: AxiosResponse) => {
    saveHeaders(response, options)
    options.afterSuccess && options.afterSuccess(response)
  }

  const opts = { ...getBaseOpts(options, 'signIn'), afterSuccess }

  const [
    { saving: signingIn, saveError: error },
    { save, setInfo, resetState },
  ] = useCroods(opts as InstanceOptions)

  useOnUnmount(resetState)

  const isFormValid = isValidForm(formState)

  const signIn = async data => {
    const saved = await save({})(data)
    saved && setInfo(saved, false)
  }

  const onSubmit = (event: Event) => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? signIn(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      emailProps: fieldProps.apply(null, commonFields.email),
      passwordProps: fieldProps.apply(null, commonFields.password),
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

export default useSignIn
