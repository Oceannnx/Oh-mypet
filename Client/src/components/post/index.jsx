import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Post = (props) => {
  const navigate = useNavigate()
  const { fName, lName, title, price, location, postId, postDate } = props || {
    fName: '',
    lName: '',
    uid: '',
    title: '',
    price: '',
    location: '',
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

  const handleOnClick = () => {
    navigate(`/sellpost/${postId}`)
  }

  return (
    <>
      <div className="m-10 p-4 border-2 w-96 h-96 min-w-0 " onClick={handleOnClick}>
        <h1 className="font-bold text-lg">{fName + ' ' + lName}</h1>
        <div className="font-thin">{date}</div>
        <img className="mt-4" src="src\assets\Testimg.png" />
        <h1 className="mt-4 font-bold text-lg">{title}</h1>
        <div>Price : {price} $</div>
        <div className="text-sm font-light">{location}</div>
      </div>
    </>
  )
}
