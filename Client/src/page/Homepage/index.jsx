import { Footer } from '../../components/Footer'
import { Post } from '../../components/post'
import { AxiosLib } from '../../lib/axios'
import { useEffect, useState } from 'react'

export const Homepage = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchSellPost = async () => {
    try {
      const result = await AxiosLib.get('/api/fetchsellpost')
      setPosts(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSellPost()
  }, [])
  console.log(posts)
  return (
    <>
      {isLoading ? (
        <div className="h-screen bg-[#FFFDF3]">
          <div className="animate-spin rounded-full h-30 w-30 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                userId={post.user._id}
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
      <Footer />
    </>
  )
}
