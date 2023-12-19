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
  const { comment, commentId, commentDate, email, fName, lName, userID, profileImg } = props || {
    comment: '',
    commentDate: '',
    commentId: '',
    email: '',
    fName: '',
    lName: '',
    userID: '',
    profileImg: '',
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
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      try {
        await AxiosLib.delete(`api/deleteComment/${commentId}`)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
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
  console.log(profileImg)
  return (
    <>
      {isLoad ? (
        <div className="border p-3 my-3 relative">
          <div className="flex pb-3">
            <img
              className="xl:rounded-lg rounded w-5 h-5 xl:w-8 xl:h-8 cursor-pointer items-center object-cover "
              src={
                profileImg ? profileImg : `https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`
              }
            ></img>
            <div className="">
              <div
                onClick={handleOnClickUser}
                className="grid items-center cursor-pointer w-fit font-bold text-sm ml-3"
              >
                {fName + ' ' + lName}
              </div>
              <div className="text-xs font-thin ml-3">{date}</div>
            </div>
          </div>
          <div className="text-sm">{comment}</div>
          {isOwner ? (
            <div className="absolute top-4 right-4 hover:text-red-500 fill-current">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=""
                viewBox="0 0 24 24"
                width="24px"
                height="24px "
                onClick={deleteComment}
              >
                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z" />
              </svg>
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
