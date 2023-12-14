import React, { useContext, useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { AxiosLib } from '../../lib/axios'
import { AdvPost } from '../../components/AdvPost'
import { AuthContext } from '../../context/user'
import Swal from 'sweetalert2'

export const Advidence = () => {
  const [advPosts, setAdvPost] = useState([])
  const auth = useContext(AuthContext)

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
    if (!auth?.authContext?.IsLogin) {
      Swal.fire({
        title: 'Error!',
        text: 'Please login first.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    }
  }, [])
  return (
    <>
      {auth?.authContext?.IsLogin ? (
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
                  fName={advPost.user.fName}
                  lName={advPost.user.lName}
                  advPostID={advPost._id}
                />
              )
            })}
          </div>
          <Footer />
        </div>
      ) : (
        ''
      )}
    </>
  )
}
