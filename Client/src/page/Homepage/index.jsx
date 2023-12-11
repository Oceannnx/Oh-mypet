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
            <div className="border rounded-lg border-gray-400 w-[1320px] h-[413px] bg-[#E0F1F5] drop-shadow-lg">
              <div className="grid grid-cols-2">
                <div className="flex justify-center items-center py-[200px] text-2xl text-blue-900">
                  <h1>WELCOME TO OH-MYPET</h1>
                  {/* <h1>If you have a passion for pets You are on the right track.</h1> */}
                </div>
                <div className="flex justify-start mt-[-100px] my-5">
                  <img src="src/assets/dog.png" alt="Logo" width="800px"></img>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-secondaryColor justify-center py-8">
            <div className="mx-5 flex flex-wrap">
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
        </div>
      )}
      <Footer />
    </section>
  )
}
