import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [formState, fields] = useFormState()
  const [
    { saving: signingUp, saved: signedUp, saveError: error },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    save()(formState.values)
  }

  return [
    {
      fields,
      emailProps: fields.email('email'),
      passwordProps: fields.password('password'),
      passwordConfirmationProps: fields.password('passwordConfirmation'),
      formProps: { onSubmit },
      signingUp,
      signedUp,
      error,
    },
    save(),
  ]
}
