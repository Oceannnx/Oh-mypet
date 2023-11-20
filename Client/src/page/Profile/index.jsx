import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import { useState } from 'react'
import { Footer } from '../../components/Footer'
import { Post } from '../../components/post'
import Swal from 'sweetalert2'

export const Profile = () => {
  const [account, setAccount] = useState([])
  const [password, setPassword] = useState([
    {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  ])
  const accounId = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get(`/api/account/${accounId.id}`)
      setAccount(result.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnAccountChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const handleOnPasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const onSubmitAccount = async (e) => {
    e.preventDefault()
    try {
      const result = await AxiosLib.post('/api/editAccount', account)
      if (result.status === 200) {
        Swal.fire('Success', 'Edit account success', 'success')
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire('Error', 'Email already exist', 'error')
      }
    }
  }
  const OnSubmitPassword = async (e) => {
    try {
      e.preventDefault()
      const number = /[0-9]/g
      const upperCase = /[A-Z]/g
      const lowerCase = /[a-z]/g
      const specialCharacter = /(?=.*\W)/g
      if (password.password.length < 8) return Swal.fire('Error', 'Password must be at least 8 characters', 'error')
      else if (password.password.includes(' ')) return Swal.fire('Error', 'Password cannot contain space', 'error')
      else if (!password.password.match(number))
        return Swal.fire('Error', 'Password must contain at least one number', 'error')
      else if (!password.password.match(upperCase))
        return Swal.fire('Error', 'Password must contain at least one uppercase', 'error')
      else if (!password.password.match(lowerCase))
        return Swal.fire('Error', 'Password must contain at least one lowercase', 'error')
      else if (!password.password.match(specialCharacter)) {
        return Swal.fire('Error', 'Password must contain at least one special character', 'error')
      } else {
        const result = await AxiosLib.post('/api/changePassword', password)
        if (result.status === 200) {
          Swal.fire('Success', 'Edit password success', 'success')
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire('Error', 'Password not match', 'error')
      }
    }
  }

  const fetchMySellPost = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchMySellPost/${accounId.id}`)
      setPosts(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAccount()
    fetchMySellPost()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div>
          <form onSubmit={onSubmitAccount}>
            <img src="src/assets/Logo.png"></img>
            <div>
              <div>Email</div>
              <input
                type="email"
                name="email"
                onChange={handleOnAccountChange}
                placeholder="Email"
                value={account.email}
              ></input>
            </div>
            <div>
              <div>FirstName</div>
              <input
                type="text"
                name="fName"
                onChange={handleOnAccountChange}
                placeholder="First name"
                value={account.fName}
              ></input>
            </div>
            <div>
              <div>LastName</div>
              <input
                type="text"
                name="lName"
                onChange={handleOnAccountChange}
                placeholder="Last name"
                value={account.lName}
              ></input>
              <input type="submit" value="Confirm Edit"></input>
            </div>
          </form>

          <form onSubmit={OnSubmitPassword}>
            <div>Password</div>
            <input type="password" name="currentPassword"></input>
            <input type="password" name="newPassword" onChange={handleOnPasswordChange}></input>
            <input type="password" name="confirmPassword" onChange={handleOnPasswordChange}></input>
            <input type="submit" value="Change Password"></input>
          </form>

          <div className="grid grid grid-cols-4">
            {posts.map((post, index) => {
              return (
                <div key={index}>
                  <Post
                    key={index}
                    email={post.user.email}
                    fName={post.user.fName}
                    lName={post.user.lName}
                    title={post.title}
                    price={post.petPrice}
                    location={post.petLocation}
                    postDate={post.petPostDate}
                    postId={post._id}
                  />
                  <div className="flex">
                    <div className="w-fit">Hello</div>
                  </div>
                </div>
              )
            })}
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  )
}
