import React from 'react'

import useCurrentUser from './useCurrentUser'
import { UserContextValueType, Provider } from './typeDeclarations'

const UserContext = React.createContext<UserContextValueType | undefined>(
  undefined,
)

const AuthProvider = (props: Provider) => {
  const value = useCurrentUser({})

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}

export function useUserFromContext(): UserContextValueType {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUserFromContext must be used within a AuthProvider')
  }

  return context
}

export default AuthProvider
