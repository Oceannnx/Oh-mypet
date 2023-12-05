import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const AdvPost = (props) => {
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const { postDate, postDesc, title, fName, lName, userId } = props || {
    postDate: '',
    postDesc: '',
    title: '',
    fName: '',
    lName: '',
    userId: '',
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userId}`)
  }

  useEffect(() => {
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

  return (
    <>
      <div className="border-4 w-1/2 min-w-[33%] p-5 m-5">
        <div className="flex pb-3">
          <img
            className="rounded-lg w-11 h-11 cursor-pointer"
            src={`https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
          ></img>
          <div className="">
            <div onClick={handleOnClickUser} className="grid items-center cursor-pointer w-fit font-bold text-lg ml-3">
              {fName + ' ' + lName}
            </div>
            <div className="text-sm font-thin ml-3">{date}</div>
          </div>
        </div>
        <div className="text-2xl">{title}</div>
        <div className="text-lg">{postDesc}</div>
      </div>
    </>
  )
}
