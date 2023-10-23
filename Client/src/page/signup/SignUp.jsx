import { Link } from "react-router-dom"
import { Navbar } from "../../component/Navbar"
import { Footer } from "../../component/Footer"
import { useState } from "react";
// import Swal from "sweetalert2";
import axios from "axios";


export const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassowrd, setConfirmPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassowrd && password != null) {
      axios.post(('http:localhost:3000/signup'), { username, password })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit} className="bg-slate-400">
        <h1 className="">Sign Up</h1>

        <label htmlFor='username'>Username</label>
        <input type='text' id='username' placeholder="username" onChange={(e) => { setUsername(e.target.value) }} />

        <label htmlFor='password'>Password</label>
        <input type='password' id='password' placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />

        <label htmlFor='confirmpassword'>Confirm Password</label>
        <input type='password' id='confirmpassword' placeholder="confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }} />

        <Link to='/login' className='text-blue-900 hover:text-blue-700' >Already have account?</Link>
        <input type='submit' className="btn" />
      </form>
      <Footer></Footer>
    </>
  )
}