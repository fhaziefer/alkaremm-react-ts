import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean
  admin?: boolean
  setAuthenticated: (newState: boolean) => void
  setAdmin: (newState: boolean) => void
}

const initialValue = {
  authenticated: false,
  admin: false,
  setAuthenticated: () => {},
  setAdmin: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {

  const [authenticated, setAuthenticated] = useState(initialValue.authenticated)
  const [admin, setAdmin] = useState(initialValue.admin)

  const navigate = useNavigate()

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated, admin, setAdmin}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }