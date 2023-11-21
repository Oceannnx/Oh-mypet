import { Post } from '../../components/post'
import { AxiosLib } from '../../lib/axios'
import { useEffect, useState } from 'react'

export const PostList = (props) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { accountID } = props || ''
  console.log(accountID)
  const fetchSellPost = async () => {
    try {
      const result = await AxiosLib.get(`/api/fetchMySellPost/${accountID}`)
      setPosts(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSellPost()
  }, [])
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-[#FFFDF3]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 bg-[#FFFDF3]">
          {posts.map((post, index) => {
            return (
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
            )
          })}
        </div>
      )}
    </>
  )
}
