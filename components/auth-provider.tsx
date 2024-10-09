'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  authenticated: boolean
  update: () => void
}

// Create the context with a default value (authenticated: false)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({ authenticated: false })

  // check local storage if there is auth session present
  // if there is an active session update context
  useEffect(() => {
    const activeSession = localStorage.getItem('auth-session')
    console.log('session: ', activeSession)
    if (activeSession) {
      setAuth({ authenticated: true })
    }
  }, [])

  // Toggle authentication status
  const update = () => {
    setAuth((prevAuth) => ({ authenticated: !prevAuth.authenticated }))
  }

  return (
    <AuthContext.Provider value={{ authenticated: auth.authenticated, update }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for consuming the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}

export { AuthProvider, useAuth }
