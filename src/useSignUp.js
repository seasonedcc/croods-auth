import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [formState, fields] = useFormState()
  const [
    { saving: signingUp, saved: signedUp, saveError: error },
    { save, setInfo },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  const onSubmit = async event => {
    event && event.preventDefault && event.preventDefault()
    const saved = await save()(formState.values)
    saved && setInfo(saved)
  }

  return [
    {
      fields,
      emailProps: fields.email('email'),
      passwordProps: fields.password('password'),
      passwordConfirmationProps: fields.password('passwordConfirmation'),
      formProps: { onSubmit },
      formState,
      signingUp,
      signedUp,
      error,
    },
    save(),
  ]
}
