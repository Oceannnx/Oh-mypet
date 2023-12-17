import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { AxiosLib } from '../../lib/axios'
import { AdvPost } from '../../components/AdvPost'
import Swal from 'sweetalert2'

export const Advidence = () => {
  const [advPosts, setAdvPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAdvPost = async () => {
    try {
      const result = await AxiosLib.get('/api/fetchadvpost')
      setAdvPost(result.data)
      setIsLoading(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }
  useEffect(() => {
    fetchAdvPost()
  }, [])
  return (
    <>
      {isLoading ? (
        <div className="h-screen bg-[#FFFDF3] flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex bg-secondaryColor flex-col justify-items-center">
              {advPosts.map((advPost, index) => {
                return (
                  <AdvPost
                    key={index}
                    postDate={advPost.postDate}
                    postDesc={advPost.postDesc}
                    title={advPost.title}
                    userId={advPost.user._id}
                    email={advPost.user.email}
                    fName={advPost.user.fName}
                    lName={advPost.user.lName}
                    advPostID={advPost._id}
                  />
                )
              })}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
