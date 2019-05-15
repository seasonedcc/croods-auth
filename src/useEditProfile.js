import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useCurrentUser from './useCurrentUser'

export default (options, callback) => {
  const opts = getBaseOpts(options, 'editProfile')
  const [{ currentUser }, setCurrentUser] = useCurrentUser(null, callback)
  const [formState, fields] = useFormState(currentUser)
  const [{ saving, saveError: error }, { save }] = useCroods(opts)

  const saveData = async data => {
    const user = await save({ method: 'PUT' })(data)
    if (user) setCurrentUser(user)
    return user
  }

  const onSubmit = async event => {
    event && event.preventDefault && event.preventDefault()
    return saveData(formState.values)
  }

  return [
    {
      fields,
      formProps: { onSubmit },
      formState,
      saving,
      error,
      currentUser,
    },
    saveData,
  ]
}
