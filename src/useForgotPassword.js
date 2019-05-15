import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const opts = getBaseOpts(options, 'forgotPassword')
  const [formState, fields] = useFormState()
  const [{ saving: sending, saveError: error }, { save }] = useCroods(opts)

  const send = data => {
    const redirectUrl = options.redirectUrl || '/'
    return save()({ redirectUrl, ...data })
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    send(formState.values)
  }

  return [
    {
      sending,
      error,
      formState,
      formProps: { onSubmit },
      emailProps: fields.email('email'),
      fields,
    },
    send,
  ]
}
