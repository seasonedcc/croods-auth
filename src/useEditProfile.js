import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import useCurrentUser from './useCurrentUser'

export default (options, callback) => {
  const opts = getBaseOpts(options, 'editProfile')
  const [{ currentUser }, setCurrentUser] = useCurrentUser(null, callback)
  const [formState, fields] = useFormState(currentUser)
  const [{ saving, saveError: error }, { save }] = useCroods(opts)

  const onSubmit = async event => {
    event && event.preventDefault && event.preventDefault()
    const user = await save(true)(formState.values)
    user && setCurrentUser(user)
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
    save(true),
  ]
}
