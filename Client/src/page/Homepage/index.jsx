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
          // console.log(parseInt((Date.now() - Date.parse(post.petPostdate)) / 1000 / 60))
          return (
            <Post
              key={index}
              email={post.user[0].email}
              fName={post.user[0].fName}
              lName={post.user[0].lName}
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
