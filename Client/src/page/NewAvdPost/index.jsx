import { useContext } from 'react'
import { AuthContext } from '../../context/user'
import { useState } from 'react'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'

export const NewAvdPost = () => {
  const auth = useContext(AuthContext)
  if (!auth?.authContext?.IsLogin) {
    Swal.fire({
      title: 'Error!',
      text: 'Please login first.',
      icon: 'error',
      confirmButtonText: 'OK',
    })
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  }
  const [advPost, setAdvPost] = useState([])
  const handleChange = (e) => {
    setAdvPost({ ...advPost, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await AxiosLib.post('/api/newAdvPost', advPost)
      if (result.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Your post has been created.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }
  return (
    <>
      <form
        className="h-screen flex bg-secondaryColor justify-items-center items-center flex-col py-3"
        onSubmit={handleSubmit}
      >
        <div className="border rounded-md border-gray-400 bg-[#E0F1F5]">
          <div className="flex justify-center text-3xl py-5 text-blue-900"> New Advidence Post</div>
          <div className=" py-3">
            <div className="flex  mb-4">
              <img
                className="mx-3 rounded-lg w-11 h-11 cursor-pointer"
                src={`https://avatar.vercel.sh/${auth?.authContext?.fName + auth?.authContext?.lName}.svg?text=${
                  auth?.authContext?.fName[0] + auth?.authContext?.lName[0]
                }`}
              ></img>
              <div className="grid items-center cursor-pointer w-fit text-xl ml-3 ">
                {auth?.authContext?.fName + ' ' + auth?.authContext?.lName}
              </div>
            </div>
            <div className="flex flex-col mx-3">
              <input
                type="text"
                className="border rounded-md border-gray-400 text-lg mb-3 p-2 h-10 "
                placeholder="What's going on?"
                name="title"
                onChange={handleChange}
              ></input>
              <textarea
                name="postDesc"
                id="postDesc"
                placeholder="Can you tell me about your problem?"
                className="border rounded-md border-gray-400 resize-none border-solid h-[150px] w-[575px] px-2 text-lg"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn bg-primaryColor hover:bg-secondaryColor py-1 my-2" name="submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
