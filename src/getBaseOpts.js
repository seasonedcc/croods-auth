import get from 'lodash/get'

const methodPaths = {
  currentUser: 'auth/validate_token',
  signIn: 'auth/sign_in',
  signOut: 'auth/sign_out',
  forgotPassword: 'auth/password',
  resetPassword: 'auth/password',
}

export default (options, method) => ({
  name: 'auth',
  path: get(methodPaths, method, 'auth'),
  parseResponse: ({ data }) => data.data,
  ...options,
})
