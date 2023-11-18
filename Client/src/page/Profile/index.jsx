import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import { useState } from 'react'
import { Footer } from '../../components/Footer'
import { Post } from '../../components/post'

export const Profile = () => {
  const [account, setAccount] = useState([])
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
  console.log(posts)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div>
          <div>
            <img src="src/assets/Logo.png"></img>
            <div>{account.email}</div>
            <div>{account.fName}</div>
            <div>{account.lName}</div>
            <div></div>
          </div>
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
