import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const Post = (props) => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { userId, email, fName, lName, title, petType, price, location, petImage, postId, postDate } = props || {
    userId: '',
    email: '',
    fName: '',
    lName: '',
    title: '',
    petType: '',
    price: '',
    location: '',
    petImage: '',
    postId: '',
    postDate: '',
  }
  const [date, setDate] = useState('')
  const [isOwner, setIsOwner] = useState(false)

  const deletePost = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
      try {
        await AxiosLib.delete(`api/deletePost/${postId}`)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
      window.location.reload()
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

  const handleOnClickPost = () => {
    navigate(`/sellpost/${postId}`)
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userId}`)
  }

  return (
    <>
      <div className="m-10 p-4 border-2 w-96 h-[472px] min-w-0 ">
        {isOwner ? (
          <div>
            <button
              className="border-2 border-slate-100 bg-slate-100 rounded-full px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white float-right mr-2 mb-2"
              onClick={deletePost}
            >
              X
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="flex " onClick={handleOnClickUser}>
          <img
            className="rounded-lg w-11 h-11 cursor-pointer"
            src={`https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
          ></img>
          <div className="">
            <div className="grid items-center cursor-pointer w-fit font-bold text-lg ml-3">{fName + ' ' + lName}</div>
            <div className="text-sm font-thin ml-3">{date}</div>
          </div>
        </div>

        <div className="grid justify-items-center items-center h-[238px] ">
          <img className="max-h-[206px]" src={petImage} />
        </div>
        <div>
          <h1 className="mt-4 font-bold text-lg">{title}</h1>
          <div>Type :{petType}</div>
          <div>Price : {price} $</div>
          <div className="text-sm font-light">{location}</div>

          <div className="grid justify-items-end">
            <div onClick={handleOnClickPost} className="text-blue-900 hover:text-blue-700 py- underline cursor-pointer">
              ดูเพิ่มเติม
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
