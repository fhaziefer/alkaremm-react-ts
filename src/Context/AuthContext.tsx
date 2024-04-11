import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate()

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated, isAdmin, setIsAdmin}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }