import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AxiosLib } from '../../lib/axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'
import Swal from 'sweetalert2'

export const SignUp = () => {
  const auth = useContext(AuthContext)
  const IsLogin = auth?.authContext.IsLogin || false
  if (IsLogin) {
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
      if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409)
        return Swal.fire('Error', error.response.data.message, 'error')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="h-screen bg-[#FFFDF3] ">
        <div className="border-2 border-[#FFFDF3]  ">
          <div className="grid grid-cols-2 py-5">
            <div className="flex justify-center items-center flex-col">
              <img src="src/assets/Logo.png" alt="Logo" width="200" />
              <h1 className="flex justify-center py-2 text-blue-900 text-xl">OH-MYPET</h1>
              <h1 className="flex justify-center text-blue-900">เเหล่งรวมร้านค้าสุนัขเเละเเมว</h1>
            </div>
            <div className="border-2 bg-[#8ECDDD] border-[#8ECDDD] mr-5 ">
              <div className="items-center">
                <h1 className="flex justify-center text-blue-900 text-lg">Sign Up</h1>
                <div className="flex justify-center items-center flex-col">
                  <label htmlFor="fName" className="py-3 ">
                    FirstName
                  </label>
                  <input
                    type="text"
                    id="fName"
                    placeholder="FirstName"
                    name="fName"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <label htmlFor="lName" className="py-1">
                    LastName
                  </label>
                  <input
                    type="text"
                    id="lName"
                    placeholder="LastName"
                    name="lName"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <label htmlFor="email" className="py-1">
                    Email
                  </label>
                  <input
                    type="Email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2 "
                  />
                  <label htmlFor="password" className="py-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />

                  <label htmlFor="confirmpassword" className="py-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={handleChange}
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <Link to="/login" className="text-blue-900 hover:text-blue-700 py-1">
                    Already have account?
                  </Link>
                  <input type="Submit" className="btn  bg-[#FFFDF3] py-1 my-2" name="submit-btn"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
