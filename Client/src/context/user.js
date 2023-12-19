import { createContext } from 'react'

export const ContextValue = {
  fName: '',
  lName: '',
  IsLogin: false,
  email: '',
  profileImg: '',
}

export const AuthContext = createContext(null)
