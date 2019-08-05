import { ActionOptions, } from 'croods/dist/types/typeDeclarations'

import { SignInProviderState } from './typeDeclarations'
import useSignIn from './useSignIn'

function useProviderAuth(
  provider: string, options: ActionOptions = {}
): [SignInProviderState, (a: object) => Promise<void>] {

  const [ { signingIn, error }, signIn] = useSignIn(
    {path: `auth/social_media/${provider}`, ...options}
  )
  return [ { signingIn, error }, signIn]
}

export default useProviderAuth
