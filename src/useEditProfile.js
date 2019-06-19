import { useEffect } from 'react'
import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useCurrentUser from './useCurrentUser'
import useOnUnmount from './useOnUnmount'
import { getFieldError, getFieldProps, isValidForm } from './formHelpers'

export default (options, currentUserOptions) => {
  const opts = getBaseOpts(options, 'editProfile')
  const [{ currentUser }, setCurrentUser] = useCurrentUser(currentUserOptions)
  const [formState, fields] = useFormState(currentUser)
  const [
    { saving, saveError: error },
    { save, setInfo, resetState },
  ] = useCroods(opts)

  const isFormValid = isValidForm(formState)

  useEffect(() => {
    setInfo(currentUser)
  }, [])
  useOnUnmount(resetState)

  const saveData = async data => {
    const user = await save({ method: 'PUT' })(data)
    if (user) setCurrentUser(user)
    return user
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return isFormValid ? saveData(formState.values) : undefined
  }

  const fieldError = getFieldError(formState)
  const fieldProps = getFieldProps(fields, formState)

  return [
    {
      currentUser,
      fields,
      formProps: { onSubmit },
      fieldProps,
      fieldError,
      formState,
      isFormValid,
      saving,
      error,
    },
    saveData,
  ]
}
