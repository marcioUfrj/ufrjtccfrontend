import React, { useState, useEffect, createContext, useContext } from 'react'
import { checkUser } from '../../middleware/auth'

export const UserContext = createContext()

export function useUserContext() {
  return useContext(UserContext)
}

function UserProvider ({ children }){

  
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser(setUser)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider