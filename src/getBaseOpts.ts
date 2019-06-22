import get from 'lodash/get'
import { ActionOptions } from 'croods/dist/types/typeDeclarations'
import { AxiosResponse } from 'axios'

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

export default function(options: ActionOptions, method: string): ActionOptions {
  return {
    name: 'auth',
    stateId: get(methodStateId, method),
    path: get(methodPaths, method, 'auth'),
    updateRootInfo: true,
    parseResponse: ({ data }: AxiosResponse) => data.data,
    ...options,
  }
}
