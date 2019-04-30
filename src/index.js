import { useCroods } from 'croods-light'

const getBaseOpts = (options = {}) => ({
  persistHeaders: true,
  parseResponse: ({ data }) => data.data,
  ...options,
})

export const useCurrentUser = (options = {}, autoFetch = true) => {
  const { name = 'auth', path = 'auth/validate_token' } = options
  const [{ info: currentUser, fetchingInfo }, { fetch }] = useCroods(
    { ...getBaseOpts(options), name, id: 'currentUser', path },
    autoFetch,
  )

  return [{ currentUser, fetchingUser: fetchingInfo }, fetch]
}

export const useSignIn = (options = {}) => {
  const { name = 'auth', path = 'auth/sign_in' } = options
  const [
    { saving: signInIn, saved: signed, saveError: signInError },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [{ signInIn, signed, signInError }, save()]
}

export const useSignOut = (options = {}) => {
  const { name = 'auth', path = 'auth/sign_out' } = options
  const [
    {
      info: currentUser,
      destroyed: signedOut,
      destroying: signingOut,
      destroyError: signOutError,
    },
    { destroy },
  ] = useCroods({
    ...getBaseOpts(options),
    name,
    id: 'currentUser',
    path,
  })

  return [
    { currentUser, signingOut, signedOut, signOutError },
    destroy(currentUser && currentUser.id),
  ]
}

export const useSignUp = (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [
    { saving: signingUp, saved: signedUp, saveError: signUpError },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [{ signingUp, signedUp, signUpError }, save()]
}

export const useDeleteAccount = (options = {}) => {
  const { name = 'auth', path = 'auth' } = options
  const [
    {
      info: currentUser,
      destroying: deletingAccount,
      destroyError: deleteError,
      destroyed: deleted,
    },
    { destroy },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [
    { currentUser, deletingAccount, deleted, deleteError },
    destroy(currentUser && currentUser.id),
  ]
}

export const useForgotPassword = (options = {}) => {
  const { name = 'auth', path = 'auth/password' } = options
  const [
    { saving: sendingForgot, destroyError: sendError },
    { save },
  ] = useCroods({ ...getBaseOpts(options), name, path })

  return [
    { sendingForgot, sendError },
    (email, redirectUrl) => save()({ email, redirectUrl }),
  ]
}
