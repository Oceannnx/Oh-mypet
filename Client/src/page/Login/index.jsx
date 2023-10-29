import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'

export const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const result = await AxiosLib.post('/login', { username: login.username, password: login.password })
    try {
      if (result.status === 200) return (window.location.href = '/')
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409) {
        return Swal.fire('Error', error.response.data.message, 'error')
      }
    }
  }

  return (
    <>
      <form className="border-solid bg-slate-400" onSubmit={handlesubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          className="focus:border-none"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" name="password" onChange={handleChange} />

        <Link to="/fogotpassword" className="text-blue-900 hover:text-blue-700">
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
