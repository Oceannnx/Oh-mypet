import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'

export const Login = () => {
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
      <form className="border-solid bg-rose-50 flex justify-center items-center h-52 flex-col" onSubmit={handlesubmit}>
        <h1>Login</h1>
        <div className="flex ">
          <label className="select-none" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            className="focus:border-none focus:outline-none focus:ring w-1/4 mr-2 ml-2 mb-2 mt-2 h-10 rounded-md border-2 border-gray-400 border-solid "
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="focus:border-none focus:outline-none focus:ring ring w-1/4 mr-2 ml-2 mb-2 mt-2 h-10 rounded-md border-2 border-gray-400 border-solid"
          />
        </div>
        <Link to="/forgotpassword" className="text-blue-900 hover:text-blue-700">
          Forgot Password?
        </Link>

        <Link to="/signup" className="text-blue-900 hover:text-blue-700">
          New to Ohmypet ?
        </Link>

        <input type="submit" className="btn" />
      </form>
    </>
  )
}
