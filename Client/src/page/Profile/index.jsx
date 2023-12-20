import React from 'react'
import { useParams } from 'react-router-dom'
import { PostList } from '../../components/PostList'
import { MyAccount } from '../../components/MyAccount'

export const Profile = () => {
  const accounId = useParams()

  return (
    <>
      <div className="bg-[#FFFDF3] flex justify-center py-7">
        <MyAccount accountID={accounId.id} />
      </div>
      <PostList accountID={accounId.id} />
    </>
  )
}
