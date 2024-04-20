import { createContext, ReactNode, useEffect, useState } from 'react';
import { apiCountUser } from '../Services/Api/AlkareemApi/get';
import { useLocalStorage } from '../Hooks/useLocalStorage';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean
  isAdmin?: boolean
  setAuthenticated: (newState: boolean) => void
  setIsAdmin: (newState: boolean) => void
}

const initialValue = {
  authenticated: false,
  isAdmin: false,
  setAuthenticated: () => {},
  setIsAdmin: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {

  const [authenticated, setAuthenticated] = useState(initialValue.authenticated)
  const [isAdmin, setIsAdmin] = useState(initialValue.isAdmin)

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated, isAdmin, setIsAdmin}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }