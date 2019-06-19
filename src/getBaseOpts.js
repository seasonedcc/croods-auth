import get from 'lodash/get'

const methodPaths = {
  currentUser: 'auth/validate_token',
  signIn: 'auth/sign_in',
  signOut: 'auth/sign_out',
  forgotPassword: 'auth/password',
  resetPassword: 'auth/password',
}

const methodStateId = {
  deleteAccount: 'delete',
  editProfile: 'edit',
  signIn: 'signIn',
  signOut: 'signOut',
  signUp: 'signUp',
  forgotPassword: 'forgot',
  resetPassword: 'reset',
}

export default (options, method) => ({
  name: 'auth',
  stateId: get(methodStateId, method),
  path: get(methodPaths, method, 'auth'),
  updateRootInfo: true,
  parseResponse: ({ data }) => data.data,
  ...options,
})
