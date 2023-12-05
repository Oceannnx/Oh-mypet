import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Comment = (props) => {
  const [date, setDate] = useState('')
  const navigate = useNavigate()
  const { comment, commentDate, fName, lName, userID } = props || {
    comment: '',
    commentDate: '',
    fName: '',
    lName: '',
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userID}`)
  }
  useEffect(() => {
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
      <div className="border p-3 my-3">
        <div className="flex pb-3">
          <img
            className="rounded-lg w-9 h-9 cursor-pointer"
            src={`https://avatar.vercel.sh/${fName + lName}.svg?text=${fName[0] + lName[0]}`}
          ></img>
          <div className="">
            <div onClick={handleOnClickUser} className="grid items-center cursor-pointer w-fit font-bold text-sm ml-3">
              {fName + ' ' + lName}
            </div>
            <div className="text-sm font-thin ml-3">{date}</div>
          </div>
        </div>
        <div>{comment}</div>
      </div>
    </>
  )
}
