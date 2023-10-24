import { Route, Routes } from 'react-router-dom'
import { Homepage } from './page/Homepage'
import { Login } from './page/login/'
import { SignUp } from './page/signup/'
import { Navbar } from './components/Navbar'

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
