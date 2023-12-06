import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/user'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AxiosLib } from '../../lib/axios'

export const Comment = (props) => {
  const [date, setDate] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { comment, commentId, commentDate, email, fName, lName, userID } = props || {
    comment: '',
    commentDate: '',
    commentId: '',
    email: '',
    fName: '',
    lName: '',
  }
  const deleteComment = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Your comment has been deleted.', 'success')
      try {
        await AxiosLib.delete(`api/deleteComment/${commentId}`)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userID}`)
  }
  useEffect(() => {
    if (auth?.authContext?.email === email) {
      setIsOwner(true)
    }
    setIsLoad(true)
    if (parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60) < 1) {
      setDate('Recently')
    } else if (parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60) < 60) {
      setDate(parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60) + ' minutes ago')
    } else if (parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60 / 60) < 24) {
      setDate(parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60 / 60) + ' hour ago')
    } else if (parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60 / 60 / 24) < 7) {
      setDate(parseInt((Date.now() - Date.parse(commentDate)) / 1000 / 60 / 60 / 24) + ' day ago')
    } else {
      const date = new Date(commentDate)
      setDate(date.toLocaleString('th-TH', { month: 'long', day: '2-digit', year: 'numeric' }))
    }
  }, [])
  return (
    <>
      {isLoad ? (
        <div className="border p-3 my-3 relative">
          <div className="flex pb-3">
            <img
              className="rounded-lg w-9 h-9 cursor-pointer"
              src={`https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
            ></img>
            <div className="">
              <div
                onClick={handleOnClickUser}
                className="grid items-center cursor-pointer w-fit font-bold text-sm ml-3"
              >
                {fName + ' ' + lName}
              </div>
              <div className="text-sm font-thin ml-3">{date}</div>
            </div>
          </div>
          <div className="text-m">{comment}</div>
          {isOwner ? (
            <div className="absolute top-2 right-2">
              <button
                className="border-2 border-slate-100 bg-slate-100 rounded-full px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white float-right mr-2 mb-2"
                onClick={deleteComment}
              >
                X
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div>Loading . . . </div>
      )}
    </>
  )
}
