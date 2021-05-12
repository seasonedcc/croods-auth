import React from 'react'
import useFetchCurrentUser from './useFetchCurrentUser'

const UserContext = React.createContext()

function UserContextProvider(props) {
  const value = useFetchCurrentUser()

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}

export const useCurrentUser = () => {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useCurrentUser must be used within a UserContextProvider')
  }

  return context
}

export default UserContextProvider
