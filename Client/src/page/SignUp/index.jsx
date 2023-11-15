import { Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const SignUp = () => {
  const auth = useContext(AuthContext)
  const IsLogin = auth?.authContext.IsLogin || false
  if (!IsLogin) {
    window.location.href = '/'
  }
  const [register, setRegister] = useState({
    email: '',
    fName: '',
    lName: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault()
      const number = /[0-9]/g
      const upperCase = /[A-Z]/g
      const lowerCase = /[a-z]/g
      const specialCharacter = /(?=.*\W)/g
      if (!register.email || !register.password || !register.confirmPassword)
        return Swal.fire('Error', 'Please fill all field', 'error')
      else if (!register.email.includes('@')) return Swal.fire('Error', 'Please fill email correctly', 'error')
      else if (register.password.length < 8)
        return Swal.fire('Error', 'Password must be at least 8 characters', 'error')
      else if (register.password.includes(' ')) return Swal.fire('Error', 'Password cannot contain space', 'error')
      else if (!register.password.match(number))
        return Swal.fire('Error', 'Password must contain at least one number', 'error')
      else if (!register.password.match(upperCase))
        return Swal.fire('Error', 'Password must contain at least one uppercase', 'error')
      else if (!register.password.match(lowerCase))
        return Swal.fire('Error', 'Password must contain at least one lowercase', 'error')
      else if (!register.password.match(specialCharacter)) {
        return Swal.fire('Error', 'Password must contain at least one special character', 'error')
      }
      if (register.password === register.confirmPassword) {
        const createNewUser = {
          email: register.email,
          fName: register.fName,
          lName: register.lName,
          password: register.password,
        }

        const result = await AxiosLib.post('/signup', createNewUser)

        if (result.status === 201) return (window.location.href = '/login')
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
      <form onSubmit={handleRegister} className="bg-[#FFFDF3] grid-cols-2">
        <h1 className="">Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="email" name="email" onChange={handleChange} />

        <label htmlFor="fName">FirstName</label>
        <input type="text" id="fName" placeholder="FirstName" name="fName" onChange={handleChange} />
        <label htmlFor="lName">LastName</label>
        <input type="text" id="lName" placeholder="LastName" name="lName" onChange={handleChange} />

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
