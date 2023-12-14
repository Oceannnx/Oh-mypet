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
    console.log(result)
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
        <div className="flex m-6 justify-between">
          <div className="flex w-full justify-start">
            <img
              className="rounded-lg w-9 h-9 cursor-pointer"
              src={`https://avatar.vercel.sh/${auth?.authContext?.fName + auth?.authContext?.lName}.svg?text=${
                auth?.authContext?.fName[0] + auth?.authContext?.lName[0]
              }`}
            ></img>
            <input
              onChange={handleOnchange}
              type="text"
              className="border overflow-auto mx-5 mb-4 w-full h-9 p-2"
            ></input>
          </div>
          <button
            onClick={handleComment}
            className="flex items-center break-all bg-slate-500 text-white rounded-lg w-36 p-5 h-9 mx-5 mb-4"
          >
            Comment
          </button>
        </div>
      ) : (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-lg text-lg flex bg-primaryColor px-5 py-1">
          <div className="flex justify-center items-center rounded-lg w-full p-5 h-9 text-black">
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
