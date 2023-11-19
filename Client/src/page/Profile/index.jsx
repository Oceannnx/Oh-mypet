import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import { useState } from 'react'
import { Footer } from '../../components/Footer'
import { Post } from '../../components/post'

export const Profile = () => {
  const [account, setAccount] = useState([])
  const [password, setPassword] = useState([
    {
      newPassword: '',
      confirmPassword: '',
    },
  ])
  const { accounId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const fetchAccount = async () => {
    try {
      const result = await AxiosLib.get('/api/account/:' + accounId)
      setAccount(result.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnAccountChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value })
    console.log(account)
  }
  const handleOnPasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const onSubmitAccout = async (e) => {
    await e.preventDefault()
  }
  const OnSubmitPassword = async (e) => {
    await e.preventDefault()
  }
  const fetchMySellPost = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchMySellPost/${accounId}`)
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
  // console.log(account)
  console.log(account)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div>
          <form onSubmit={onSubmitAccout}>
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
            <div>Edit</div>
          </form>
          <form onSubmit={OnSubmitPassword}>
            <div>Password</div>
            <input type="password" name="currentPassword"></input>
            <input type="password" name="newPassword" onChange={handleOnPasswordChange}></input>
            <input type="password" name="confirmPassword" onChange={handleOnPasswordChange}></input>
            <input type="submit" value="Change Password"></input>
            <div></div>
          </form>
          <div className="flex">
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
