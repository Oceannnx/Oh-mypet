import { Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const SignUp = () => {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault()
      if (register.password === register.confirmPassword) {
        const createNewUser = {
          username: register.username,
          password: register.password,
        }

        const result = await AxiosLib.post('/signup', createNewUser)

        if (result.status === 201) return (window.location.href = '/')
      } else {
        Swal.fire('Error', 'Password not match', 'error')
      }
    } catch (error) {
      // console.log(error.response.status)
      if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409)
        return Swal.fire('Error', error.response.data.message, 'error')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="bg-slate-400">
        <h1 className="">Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="username" name="username" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="password" name="password" onChange={handleChange} />

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          id="confirmpassword"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
        />

        <Link to="/login" className="text-blue-900 hover:text-blue-700">
          Already have account?
        </Link>
        <input type="Submit" className="btn" name="submit-btn"></input>
      </form>
    </>
  )
}
