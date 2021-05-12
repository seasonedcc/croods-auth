import { useEffect } from 'react'
import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useCurrentUser from './useFetchCurrentUser'
import { useOnUnmount } from './hooks'
import { getFieldError, getFieldProps, isValidForm, additionalCheckerPasswordConfirmation } from './formHelpers'
import {
  ActionOptions,
  InstanceOptions,
} from 'croods/dist/types/typeDeclarations'
import { EditProfileState } from './typeDeclarations'

interface SaveData {
  (t: object): Promise<any>
}

function useEditProfile(
  options: ActionOptions,
  currentUserOptions: ActionOptions,
): [EditProfileState, SaveData] {
  const opts = getBaseOpts(options, 'editProfile')
  const [{ currentUser }, setCurrentUser] = useCurrentUser(currentUserOptions)
  const [formState, fields] = useFormState(currentUser)
  const [
    { saving, saveError: error },
    { save, setInfo, resetState },
  ] = useCroods(opts as InstanceOptions)

  const isFormValid = isValidForm(formState, additionalCheckerPasswordConfirmation)

  useEffect(() => {
    setInfo(currentUser, false)
  }, [])
  useOnUnmount(resetState)

  const saveData = async (data: any) => {
    const user = await save({ method: 'PUT' })(data)
    if (user) setCurrentUser(user)
    return user
  }

  const onSubmit = (event: Event) => {
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
      saving: !!saving,
      error,
    },
    saveData,
  ]
}

export default useEditProfile
