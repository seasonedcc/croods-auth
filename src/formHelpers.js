import get from 'lodash/get'
import compact from 'lodash/compact'
import head from 'lodash/head'
import objValues from 'lodash/values'

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validate = validators => (value, values) =>
  head(compact(validators.map(validator => validator(value, values))))

export const confirmation = (name, message = `Must be equal to ${name}`) => (
  value,
  values,
) => {
  if (value !== values[name]) {
    return message
  }
  return undefined
}

export const presence = (message = 'Field must not be empty') => value =>
  value ? undefined : message

export const email = (message = 'Invalid email') => value =>
  value && !EMAIL_REGEX.test(value) ? message : undefined

export const minLength = (
  chars,
  message = `This field should have min ${chars} characters`,
) => value => (value && value.trim().length < chars ? message : undefined)

export const getFieldError = formState => name =>
  get(formState, `touched.${name}`) && get(formState, `errors.${name}`)

export const getFieldProps = (fields, formState) => (
  type,
  name,
  validators = [],
) => {
  const fieldError = getFieldError(formState)
  return {
    ...fields[type]({ name, validate: validate(validators) }),
    error: fieldError(name),
  }
}

export const isValidForm = formState => !objValues(formState.errors).length

export const commonFields = {
  email: ['email', 'email', [presence(), email()]],
  password: ['password', 'password', [presence(), minLength(8)]],
  passwordConfirmation: [
    'password',
    'passwordConfirmation',
    [confirmation('password', 'Password fields must be equal')],
  ],
}
