import { useCroods } from 'croods-light'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { saveHeaders } from './persistHeaders'

export default (options = {}) => {
  const [formState, fields] = useFormState()
  const opts = getBaseOpts(options, 'signIn')
  const [
    { saving: signingIn, saved: signed, saveError: error },
    { save, setInfo },
  ] = useCroods({
    ...opts,
    afterSuccess: response => {
      saveHeaders(response, opts)
      opts.afterSuccess && opts.afterSuccess(response)
    },
  })

  const signIn = async data => {
    const saved = await save()(data)
    saved && setInfo(saved)
  }

  const onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    return signIn(formState.values)
  }

  return [
    {
      fields,
      emailProps: fields.email('email'),
      passwordProps: fields.password('password'),
      formProps: { onSubmit },
      formState,
      signingIn,
      signed,
      error,
    },
    signIn,
  ]
}
