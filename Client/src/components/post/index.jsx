import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Post = (props) => {
  const navigate = useNavigate()
  const { userId, fName, lName, title, price, location, petImage, postId, postDate } = props || {
    userId: '',
    fName: '',
    lName: '',
    uid: '',
    title: '',
    price: '',
    location: '',
    petImage: '',
    postId: '',
    postDate: '',
  }
  const [date, setDate] = React.useState('')

  React.useEffect(() => {
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
  }, [postDate])
  const handleOnClickPost = () => {
    navigate(`/sellpost/${postId}`)
  }
  const handleOnClickUser = () => {
    navigate(`/account/${userId}`)
  }
  return (
    <>
      <div className="m-10 p-4 border-2 w-96 h-[472px] min-w-0 ">
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
