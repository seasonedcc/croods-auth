import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'

export default (options = {}) => {
  const { name = 'auth', path = 'auth/sign_in' } = options
  const [formState, fields] = useFormState()
  const [
    { saving: signingIn, saved: signed, saveError: error },
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
      formProps: { onSubmit },
      signingIn,
      signed,
      error,
    },
    onSubmit,
  ]
}
