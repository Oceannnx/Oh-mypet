import { createContext } from 'react'

export const ContextValue = {
  fName: '',
  lName: '',
  IsLogin: false,
  email: '',
}

export const AuthContext = createContext(null)
