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
      if (result.status === 200) {
        window.location.href = '/'
      } else {
        Swal.fire('Error', 'Unexpected status code: ' + result.status, 'error')
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404 ||
          error.response.status === 409
        ) {
          Swal.fire('Error', error.response.data.message, 'error')
        } else {
          Swal.fire('Error', 'Server Error', 'error')
        }
      } else {
        Swal.fire('Error', 'An error occurred', 'error')
      }
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
                <h1 className="flex justify-center text-blue-900 text-lg">เข้าสู่ระบบ</h1>
                <div className="flex justify-center items-center flex-col ">
<<<<<<< HEAD
                  <label htmlFor="fName" className="py-3 "></label>
                  <input
=======
                  <label htmlFor="fName" className="py-1"></label>
                  { <input
>>>>>>> d0d6d3a83db665054752b589dd474f24a8a9a03a
                    type="text"
                    id="fName"
                    placeholder="FirstName"
                    name="fName"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2 "
                  />
                  <label htmlFor="fName" className="py-3 "></label>
                  <input
                    type="text"
                    id="lName"
                    placeholder="LastName"
                    name="lName"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2 py-5"
                  />
                  <label htmlFor="fName" className="py-3 "></label>
                  <input
                    type="Email"
                    id="Email"
                    placeholder="Email"
                    name="Email"
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
                  <label htmlFor="fName" className="py-3 "></label>
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <Link to="/login" className="text-blue-900 hover:text-blue-700 py-2">
                    Already have account?
                  </Link>
                  <input type="Submit" className="btn  bg-[#FFFDF3] py-1 my-2" name="submit-btn"></input>
                </div>
              </div>
            </div>
          </div>
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
        <Link to="/signup" className="text-blue-900 hover:text-blue-700 py-5">
          New to OH-MYPET ?
        </Link>
        <input type="submit" className="btn bg-[#FFFDF3] hover:bg-[#8ECDDD]" />
      </form>
    </>
  )
}
