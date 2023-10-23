import { Route, Routes } from 'react-router-dom'
import { Homepage } from './page/homapage/Homepage'
import { Login } from './page/login/Login'
import { SignUp } from './page/signup/SignUp'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
