import compact from 'lodash/compact'
import trim from 'lodash/trim'

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const email = (message = 'Invalid email') => value =>
  value && !EMAIL_REGEX.test(value) ? message : undefined

export const minWords = (
  words,
  message = `Field must have at least ${words} words`,
) => value =>
  value && compact(value.split(' ').map(trim)).length < words
    ? message
    : undefined

export const presence = (message = `Field is required`) => value =>
  value ? undefined : message
