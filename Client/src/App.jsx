import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './page/Homepage'
import { Login } from './page/Login'
import { SignUp } from './page/SignUp'
import { Navbar } from './components/Navbar'
import { NewSellPost } from './page/NewSellPost'
import { Sellpost } from './page/Sellpost'
import { Profile } from './page/Profile'
import { AxiosLib } from './lib/axios'
import { AuthContext, ContextValue } from './context/user'

function App() {
  const [authContext, setAuthContext] = useState(ContextValue)

  const handleLogin = useCallback(async () => {
    try {
      const result = await AxiosLib.get('/api/user/me')

      if (result.status === 200) {
        setAuthContext({ id: result.data.id, IsLogin: true })
      }
    } catch (error) {
      setAuthContext({ id: '', IsLogin: false })
      console.log(error)
    }
  }, [])

  useEffect(() => {
    handleLogin().then(() => console.log('success'))
  }, [handleLogin])

  return (
    <>
      <AuthContext.Provider value={{ authContext, setAuthContext }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newsellpost" element={<NewSellPost />} />
          <Route path="/sellpost/:id" element={<Sellpost />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
