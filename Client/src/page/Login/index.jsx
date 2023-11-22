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
    try {
      const result = await AxiosLib.post('/login', { email: login.email, password: login.password })
      if (result.status === 200) return (window.location.href = '/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or Password is incorrect',
      })
    }
  }
  return (
    <>
      <form onSubmit={handlesubmit} className="h-screen bg-[#FFFDF3] ">
        <div className="border-2 border-[#FFFDF3]  ">
          <div className="grid grid-cols-2 py-5">
            <div className="flex justify-center items-center flex-col">
              <img src="src/assets/Logo.png" alt="Logo" width="200" />
              <h1 className="flex justify-center py-2 text-blue-900 text-xl">OH-MYPET</h1>
              <h1 className="flex justify-center text-blue-900">เเหล่งรวมร้านค้าสุนัขเเละเเมว</h1>
            </div>
            <div className="border-2 bg-[#FFFDF3] border-[#FFFDF3] mr-5 ">
              <div className="items-center py-5 border bg-[#8ECDDD] mr-10 ml-10 my-5">
                <h1 className="flex justify-center text-blue-900 text-lg">Log in</h1>
                <div className="flex justify-center items-center flex-col ">
                  <label htmlFor="fName" className="py-3 "></label>
                  =======
                  <input
                    type="Email"
                    id="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <label htmlFor="fName" className="py-3 "></label>
                  <input
                    type="password"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <Link to="/signup" className="text-blue-900 hover:text-blue-700 py-2">
                    New to Oh-MyPet? Sign up
                  </Link>
                  <input type="Submit" className="btn  bg-[#FFFDF3]bg-[#FFFDF3] py-1 my-2 " name="submit-btn"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
