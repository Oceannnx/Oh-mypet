import { createContext } from 'react'

export const ContextValue = {
  fName: '',
  IsLogin: false,
  email: '',
}

export const AuthContext = createContext(null)
