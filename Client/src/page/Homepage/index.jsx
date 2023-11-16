import { Footer } from '../../components/Footer'
import { Post } from '../../components/post'
import { AxiosLib } from '../../lib/axios'
import { useEffect, useState } from 'react'

export const Homepage = () => {
  const [posts, setPosts] = useState([])
  const fetchSellPost = async () => {
    try {
      const result = await AxiosLib.get('/api/fetchsellpost')
      setPosts(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSellPost()
  }, [])
  return (
    <>
      <div className="flex">
        {posts.map((post, index) => {
          console.log(post)
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
      <Footer />
    </>
  )
}
