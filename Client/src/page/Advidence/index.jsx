import React, { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { AxiosLib } from '../../lib/axios'
import { AdvPost } from '../../components/AdvPost'

export const Advidence = () => {
  const [advPosts, setAdvPost] = useState([])

  const fetchAdvPost = async () => {
    try {
      const result = await AxiosLib.get('/api/fetchadvpost')
      setAdvPost(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAdvPost()
  }, [])
  return (
    <>
      <div className="flex bg-secondaryColor flex-col justify-items-center">
        {advPosts.map((advPost, index) => {
          return (
            <AdvPost
              key={index}
              postDate={advPost.postDate}
              postDesc={advPost.postDesc}
              title={advPost.title}
              userId={advPost.user._id}
              fName={advPost.user.fName}
              lName={advPost.user.lName}
              advPostID={advPost._id}
            />
          )
        })}
      </div>
      <Footer />
    </>
  )
}
