import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const Post = (props) => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { userId, email, fName, lName, profileImg, title, petType, price, location, petImage, postId, postDate } =
    props || {
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
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
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
      <div className="p-4 border rounded-md border-gray-400 bg-white drop-shadow-md hover:drop-shadow-2xl w-[80%] h-[472px] min-w-0 hover:scale-110 transition">
        {isOwner ? (
          <div className="absolute top-5 right-5 hover:text-red-500 fill-current">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
              viewBox="0 0 24 24"
              width="24px"
              height="24px "
              onClick={deletePost}
            >
              <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z" />
            </svg>
          </div>
        ) : (
          ''
        )}
        <div className="flex " onClick={handleOnClickUser}>
          <img
            className="rounded-lg w-11 h-11 cursor-pointer items-center object-cover "
            src={profileImg ? profileImg : `https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
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
