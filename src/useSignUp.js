import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { saveHeaders } from './persistHeaders'

export default (options = {}, callback) => {
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
      callback && callback()
    },
  })

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
