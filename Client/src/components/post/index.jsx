import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Post = () => {
  const username = 'username'
  const price = 20
  const location = 'location'
  const postId = 'fgjkreosgujhoeashgoes'
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/sellpost/${postId}`)
  }

  return (
    <>
      <div className="m-10 p-4 border-2 w-96 h-96" onClick={handleOnClick}>
        <h1 className="font-bold text-lg">{username}</h1>
        <img className="mt-4" src="src\assets\Testimg.png" />
        <h2 className="mt-4">Title</h2>
        <div>$ {price}</div>
        <div className="text-sm font-light">{location}</div>
      </div>
    </>
  )
}
