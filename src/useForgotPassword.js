import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { redirectUrl = '/' } = options
  const opts = getBaseOpts(options, 'forgotPassword')
  const [formState, { email }] = useFormState()
  const [{ saving: sending, saveError: error }, { save }] = useCroods(opts)

  const send = (userEmail, url = redirectUrl) =>
    save()({ email: userEmail, redirectUrl: url })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    send(formState.values.email, redirectUrl)
  }

  return [
    {
      sending,
      error,
      formState,
      formProps: { onSubmit },
      emailProps: email('email'),
    },
    send,
  ]
}
