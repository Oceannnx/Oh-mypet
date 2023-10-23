import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './page/homapage/Homepage'
import { Login } from './page/login/Login'
import { SignUp } from './page/signup/SignUp'
import { Advidence } from './page/advidence/Advidence'
import { Newadvpost } from './newadvpost/Newadvpost'
import { Newpetpost } from './newpetpost/Newpetpost'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/advidence' element={<Advidence/>} />
        <Route path='/newpetpost' element={<Newpetpost/>} />
        <Route path='/newadvpost' element={<Newadvpost/>} />
      </Routes>
      
    </>
    )
}


export default App
