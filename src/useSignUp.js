import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { saveHeaders } from './persistHeaders'

export default (options = {}) => {
  const [formState, fields] = useFormState()
  const opts = getBaseOpts(options, 'signUp')
  const [
    { saving: signingUp, saved: signedUp, saveError: error },
    { save, setInfo },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      saveHeaders(response, opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  const signUp = async data => {
    const saved = await save()(data)
    saved && setInfo(saved)
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return signUp(formState.values)
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
    signUp,
  ]
}
