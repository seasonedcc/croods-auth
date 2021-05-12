import * as React from 'react'
import { ProviderElement } from 'croods/dist/types/typeDeclarations'

import useFetchCurrentUser from './useFetchCurrentUser'
import { UserContextValueType } from './typeDeclarations'

const UserContext = React.createContext<UserContextValueType>(undefined)

const UserContextProvider = (props: ProviderElement) => {
  const value = useFetchCurrentUser({})

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}

export function useCurrentUser(): UserContextValueType {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useCurrentUser must be used within a UserContextProvider')
  }

  return context
}

export default UserContextProvider
