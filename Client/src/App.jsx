import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './page/Homepage'
import { Login } from './page/Login'
import { SignUp } from './page/SignUp'
import { FAQ } from './page/FAQ'
import { Navbar } from './components/Navbar'
import { NewSellPost } from './page/NewSellPost'
import { Sellpost } from './page/Sellpost'
import { Profile } from './page/Profile'
import { AxiosLib } from './lib/axios'
import { AuthContext, ContextValue } from './context/user'
import { Advidence } from './page/Advidence'
import { Filter } from './page/Filter'
import { NewAvdPost } from './page/NewAvdPost'
import { Members } from './page/Member'
import { NotFound } from './page/NotFound'

function App() {
  const [authContext, setAuthContext] = useState(ContextValue)
  const handleLogin = useCallback(async () => {
    try {
      const result = await AxiosLib.get('/api/user/me')
      if (result.status === 200) {
        setAuthContext({ fName: result.data.fName, lName: result.data.lName, IsLogin: true, email: result.data.email })
      }
    } catch (error) {
      setAuthContext({ fName: '', IsLogin: false, email: '' })
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
          <Route path="/filter/:animals" element={<Filter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newsellpost" element={<NewSellPost />} />
          <Route path="/newadvpost" element={<NewAvdPost />} />
          <Route path="/advidence" element={<Advidence />} />
          <Route path="/sellpost/:postId" element={<Sellpost />} />
          <Route path="/account/:id" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Members />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
