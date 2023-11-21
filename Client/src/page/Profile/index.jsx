import React from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { PostList } from '../../components/PostList'
import { MyAccount } from '../../components/MyAccount'

export const Profile = () => {
  const accounId = useParams()
  console.log(accounId.id)

  return (
    <>
      <MyAccount accountID={accounId.id} />
      <PostList accountID={accounId.id} />
      <Footer></Footer>
    </>
  )
}
