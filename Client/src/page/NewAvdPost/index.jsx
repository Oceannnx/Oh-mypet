import { useContext } from 'react'
import { AuthContext } from '../../context/user'
import { useState } from 'react'
import { AxiosLib } from '../../lib/axios'
import Swal from 'sweetalert2'

export const NewAvdPost = () => {
  const auth = useContext(AuthContext)
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
      console.log(error)
    }
  }
  return (
    <>
      <form className="flex justify-items-center items-center flex-col py-3" onSubmit={handleSubmit}>
        <div className="text-3xl"> New Advidence Post</div>
        <div className=" py-3">
          <div className="flex  mb-4">
            <img
              className="rounded-lg w-11 h-11 cursor-pointer"
              src={`https://avatar.vercel.sh/${auth?.authContext?.fName + auth?.authContext?.lName}.svg?text=${
                auth?.authContext?.fName[0] + auth?.authContext?.lName[0]
              }`}
            ></img>
            <div className="grid items-center cursor-pointer w-fit text-xl ml-3 ">
              {auth?.authContext?.fName + ' ' + auth?.authContext?.lName}
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              className="border-2 border-gray-400 text-xl mb-3 p-2"
              placeholder="What's going on?"
              name="title"
              onChange={handleChange}
            ></input>
            <textarea
              name="postDesc"
              id="postDesc"
              placeholder="can you tell me about your problem?"
              className="border-2 border-gray-400 resize-none border-solid h-[150px] w-[575px] px-2"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn bg-primaryColor hover:bg-secondaryColor py-1 my-2" name="submit-btn">
          Submit
        </button>
      </form>
    </>
  )
}
