import { Footer } from '../../components/Footer'
import { Post } from '../../components/Post'
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
  return (
    <section>
      {isLoading ? (
        <div className="h-screen bg-[#FFFDF3] flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div className="bg-[#FFFDF3] py-[30px]">
          <div className="flex justify-center">
            <div className="md:grid md:grid-cols-2 md:m-3 m-6 grid-cols-1 border rounded-lg border-gray-400 w-[1320px] bg-[#E0F1F5] drop-shadow-lg">
              <div className="flex justify-center items-center md:py-[200px] py-[25px] md:text-2xl text-xl text-blue-900">
                <h1>WELCOME TO OH-MYPET</h1>
              </div>
              <div className="flex justify-center relative">
                <img src="src/assets/dogg.png" alt="Logo" className="md:absolute bottom-0 h-[320px]"></img>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center bg-secondaryColor py-8 md:m-3 m-6">
            {posts.map((post, index) => {
              return (
                <Post
                  key={index}
                  userId={post.user._id}
                  email={post.user.email}
                  fName={post.user.fName}
                  lName={post.user.lName}
                  title={post.title}
                  petType={post.petType}
                  price={post.petPrice}
                  location={post.petLocation}
                  petImage={post.petImages}
                  postDate={post.petPostDate}
                  postId={post._id}
                />
              )
            })}
          </div>
        </div>
      )}
      <Footer />
    </section>
  )
}
