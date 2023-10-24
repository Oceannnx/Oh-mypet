import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handlesubmit = () => {}

  return (
    <>
      <form className="border-solid bg-slate-400" onSubmit={handlesubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" className="focus:border-none" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" onChange={handleChange} />

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
