import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/password', redirectUrl = '/' } = options
  const [formState, { email }] = useFormState()
  const [{ saving: sending, saveError: error }, { save }] = useCroods({
    ...getBaseOpts(options),
    name,
    path,
  })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    save()({ email: formState.values.email, redirectUrl })
  }

  return [
    {
      sending,
      error,
      formProps: { onSubmit },
      emailProps: email('email'),
    },
    url => save()({ email: formState.values.email, redirectUrl: url }),
  ]
}
