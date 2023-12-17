import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { NewComment } from '../NewComment'
import { AllComment } from '../AllComment'
import { AuthContext } from '../../context/user'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'

export const AdvPost = (props) => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [date, setDate] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const { advPostID, postDate, postDesc, title, email, fName, lName, userId } = props || {
    advPostID: '',
    postDate: '',
    postDesc: '',
    title: '',
    email: '',
    fName: '',
    lName: '',
    userId: '',
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userId}`)
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
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      try {
        const result = await AxiosLib.delete(`/api/deleteAdvPost/${advPostID}`)
        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Success',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
    }
  }

  useEffect(() => {
    if (auth?.authContext?.email === email) {
      setIsOwner(true)
    }
    if (parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60) < 1) {
      setDate('Recently')
    } else if (parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60) < 60) {
      setDate(parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60) + ' minutes ago')
    } else if (parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60 / 60) < 24) {
      setDate(parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60 / 60) + ' hour ago')
    } else if (parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60 / 60 / 24) < 7) {
      setDate(parseInt((Date.now() - Date.parse(postDate)) / 1000 / 60 / 60 / 24) + ' day ago')
    } else {
      const date = new Date(postDate)
      setDate(date.toLocaleString('th-TH', { month: 'long', day: '2-digit', year: 'numeric' }))
    }
  }, [])
  console.log(isOwner)
  console.log(email)
  console.log(auth?.authContext?.email)
  return (
    <>
      <div className="flex justify-center ">
        <div className="border-4 w-3/4 min-w-[33%] p-5 m-5 relative">
          <div className="flex pb-3">
            <img
              className="rounded-lg w-7 xl:w-11 cursor-pointer"
              src={`https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
            ></img>
            <div className="">
              <div
                onClick={handleOnClickUser}
                className="grid items-center cursor-pointer w-fit font-bold text-base xl:text-lg ml-3"
              >
                {fName + ' ' + lName}
              </div>
              <div className="font-thin text-xs xl:text-sm ml-3">{date}</div>
            </div>
          </div>
          <div className="text-base xl:text-2xl">{title}</div>
          <div className="text-sm xl:text-lg">{postDesc}</div>
          {isOwner ? (
            <div className="absolute top-5 right-5">
              <button
                className="border-2 border-slate-100 bg-slate-100 rounded-full xl:px-2 xl:py-1 text-red-600 hover:bg-red-600 hover:text-white float-right mr-2 mb-2 text-xs xl:text-lg"
                onClick={deleteComment}
              >
                x
              </button>
            </div>
          ) : (
            ''
          )}
          <NewComment advPostID={advPostID} />
          <AllComment advPostID={advPostID} />
        </div>
      </div>
    </>
  )
}
