import React, { useState, createContext, useContext } from 'react'

export const UserContext = createContext()

export function useUserContext() {
  return useContext(UserContext)
}

function UserProvider ({ children }){

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider