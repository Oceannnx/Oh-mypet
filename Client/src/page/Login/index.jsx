import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const Login = () => {
  const auth = useContext(AuthContext)
  const IsLogin = auth?.authContext.IsLogin || false
  if (IsLogin) {
    window.location.href = '/'
  }

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const result = await AxiosLib.post('/login', { email: login.email, password: login.password })
    try {
      if (result.status === 200) return (window.location.href = '/')
      else if (result.status === 401) return Swal.fire('Error', 'Email or Password is incorrect', 'error')
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409) {
        return Swal.fire('Error', error.response.data.message, 'error')
      }
    }
  }

  return (
    <>
      <form className="h-screen bg-[#FFFDF3] flex justify-center items-center py-5  flex-col" onSubmit={handlesubmit}>
        <h1 className="text-blue-900 text-xl">เข้าสู่ระบบ</h1>
        <div className="py-2">
          <img src="src/assets/Logo.png" alt="Logo" width="200" />
          <h1 className="flex justify-center py-2 text-blue-900 ">OH-MYPET</h1>
          <h1 className="flex justify-center text-blue-900">เเหล่งรวมร้านค้าสุนัขเเละเเมว</h1>
        </div>
        <div className="flex py-5 ">
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            className="h-10 w-80 rounded-md border-2 border-gray-400 border-solid px-2 "
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="rounded-md border-2 border-gray-400 border-solid h-10 w-80 px-2 ml-2"
          />
        </div>
        <Link to="/signup" className="text-blue-900 hover:text-blue-700">
          New to Ohmypet ?
        </Link>
        <input type="submit" className="btn bg-[#8ECDDD]" />
      </form>
    </>
  )
}
