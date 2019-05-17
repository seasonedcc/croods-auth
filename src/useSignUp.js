import { useCroods } from 'croods'
import { useFormState } from 'react-use-form-state'
import getBaseOpts from './getBaseOpts'
import { saveHeaders } from './persistHeaders'

export default (options = {}) => {
  const [formState, fields] = useFormState()
  const opts = getBaseOpts(options, 'signUp')
  const [
    { saving: signingUp, saveError: error },
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
      passwordConfirmationProps: {
        ...fields.password({
          name: 'passwordConfirmation',
          validate: (value, values) => {
            if (value !== values.password) {
              return 'Password fields must be equal'
            }
            return undefined
          },
        }),
        error:
          formState.touched.passwordConfirmation &&
          formState.errors.passwordConfirmation,
      },
      formProps: { onSubmit },
      formState,
      signingUp,
      error,
    },
    signUp,
  ]
}
