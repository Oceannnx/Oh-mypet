import React from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { PostList } from '../../components/PostList'
import { MyAccount } from '../../components/MyAccount'

export const Profile = () => {
  const accounId = useParams()

  return (
    <>
      <div className="bg-[#FFFDF3] flex justify-center py-5">
        <MyAccount accountID={accounId.id} />
      </div>
      <PostList accountID={accounId.id} />
      <Footer></Footer>
    </>
  )
}
