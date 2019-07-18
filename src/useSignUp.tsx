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
import { SignUpState } from './typeDeclarations'
import {
  commonFields,
  getFieldError,
  getFieldProps,
  isValidForm,
} from './formHelpers'

function useSignUp(
  options: ActionOptions = {},
): [SignUpState, (t: any) => Promise<any>] {
  const [formState, fields] = useFormState()

  const afterSuccess = (response: AxiosResponse) => {
    saveHeaders(response, options)
    options.afterSuccess && options.afterSuccess(response)
  }
  const opts = { ...getBaseOpts(options, 'signUp'), afterSuccess }
  const [
    { saving: signingUp, saveError: error },
    { save, setInfo, resetState },
  ] = useCroods(opts as InstanceOptions)

  useOnUnmount(resetState)

  const isFormValid = isValidForm(formState)

  const signUp = async (data: any) => {
    const saved = await save({})(data)
    saved && setInfo(saved, false)
  }

  const onSubmit = (event: Event) => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? signUp(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      fields,
      emailProps: fieldProps.apply(null, commonFields.email),
      passwordProps: fieldProps.apply(null, commonFields.password),
      passwordConfirmationProps: fieldProps.apply(
        null,
        commonFields.passwordConfirmation,
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

export default useSignUp
