import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/user'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export const NewComment = (props) => {
  const { advPostID } = props || ''
  const auth = useContext(AuthContext)
  const [comment, setComment] = useState('')
  const handleOnchange = (e) => {
    setComment(e.target.value)
  }
  const handleComment = async () => {
    const result = await AxiosLib.post('/api/newComment', { comment: comment, advPostID: advPostID })
    if (result.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Comment success',
        showConfirmButton: false,
        timer: 1500,
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  }
  return (
    <>
      {auth?.authContext.IsLogin ? (
        <div className="flex justify-evenly  items-center border p-2">
          <div className="grid grid-col-1 md:grid-cols-2 justify-items-center">
            <img
              className="rounded w-5 h-5 xl:w-8 xl:h-8 cursor-pointer"
              src={`https://avatar.vercel.sh/${auth?.authContext?.fName + auth?.authContext?.lName}.svg?text=${
                auth?.authContext?.fName[0] + auth?.authContext?.lName[0]
              }`}
            ></img>
            <div className="hidden md:flex items-center">{auth?.authContext?.fName}</div>
          </div>

          <input
            placeholder="What do you think?"
            className="w-3/4 xl:p-3 border rounded xl:text-lg text-xs px-2 py-1"
            type="text"
            onClick={handleOnchange}
          ></input>

          <img onClick={handleComment} className="w-4 xl:w-8 round" src=".\src\assets\paper-plane.png"></img>
        </div>
      ) : (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-lg text-lg flex bg-primaryColor px-5 py-1">
          <div className="hidden xl:flex justify-center items-center rounded-lg w-full p-5 h-9 text-black">
            Please login to comment
          </div>
          <nobr className="flex justify-center items-center group transition duration-300 text-red-500">
            <Link to="/login">
              Login now!
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-red-500"></span>
            </Link>
          </nobr>
        </div>
      )}
    </>
  )
}
