import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosLib } from '../../lib/axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export const NewSellPost = () => {
  const auth = useContext(AuthContext)
  const IsLogin = auth?.authContext.IsLogin || false
  if (!IsLogin) {
    window.location.href = '/login'
  }
  const [post, setPet] = useState({
    title: '',
    petType: '',
    petGene: '',
    petAge: '',
    petName: '',
    petGender: '',
    petBD: '',
    petPrice: '',
    petLocation: '',
    petImages: '',
    petDescription: '',
  })
  const handleChange = (e) => {
    setPet({ ...post, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      post.title === '' ||
      post.petType === '' ||
      post.petGene === '' ||
      post.petAge === '' ||
      post.petName === '' ||
      post.petGender === '' ||
      post.petBD === '' ||
      post.petPrice === '' ||
      post.petLocation === '' ||
      post.petImages === '' ||
      post.petDescription === ''
    ) {
      return Swal.fire('Error', 'Please fill all the information', 'error')
    } else {
      try {
        const result = await AxiosLib.post('/api/newsellpost', post)
        if (result.status === 201) {
          Swal.fire('Success', 'Post has been created', 'success')
          setTimeout(() => {
            window.location.href = '/'
          }, 1500)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      {IsLogin ? (
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className="h-screen bg-[#FFFDF3] flex justify-start items-center flex-col py-10"
        >
          <div className="border-2 bg-[#FFFDF3] border-[#FFFDF3]">
            <div className="flex justify-start items-center flex-col">
              <div className="border-none">
                <div>
                  <label htmlFor="title" className="mx-5">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    className="border-2 border-gray-400 border-solid h-10 w-80 px-2"
                  />
                  <label htmlFor="petType" className="mx-2">
                    Type:
                  </label>
                  <select name="petType" id="petType" className="border-2 border-gray-400 border-solid h-10 w-30 px-2">
                    <option disabled selected hidden>
                      Type
                    </option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="petGene" className="mx-2">
                    Gene:
                  </label>
                  <input
                    type="text"
                    placeholder="Gene"
                    id="petGene"
                    name="petGene"
                    className="border-2 border-gray-400 border-solid h-10 w-60 px-2"
                  />
                  <label htmlFor="petAge" className="mx-2">
                    Age:
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Age"
                    id="petAge"
                    name="petAge"
                    className="border-2 border-gray-400 border-solid h-10 w-20 px-2"
                  />
                </div>
                <div className="py-5">
                  <label htmlFor="petName" className="mx-2">
                    Pet Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Pet Name"
                    id="petName"
                    name="petName"
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2"
                  />
                  <label htmlFor="petGender" className="mx-2">
                    Gender:
                  </label>
                  <select
                    name="petGender"
                    id="petGender"
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2"
                  >
                    <option disabled selected hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="petBD" className="mx-2">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    id="petBD"
                    name="petBD"
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2"
                  />
                  <label htmlFor="petPrice" className="mx-2">
                    Price:
                  </label>
                  <input
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2"
                    type="number"
                    min="0"
                    placeholder="Price"
                    id="petPrice"
                    name="petPrice"
                  />
                  <label htmlFor="petName" className="mx-2">
                    Location:
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    id="petLocation"
                    name="petLocation"
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2 mr-2"
                  />
                </div>
                <div className="py-5">
                  <label htmlFor="petImages" className="mx-2">
                    Images:
                  </label>
                  <input type="file" name="petImages" id="petImages" accept="image/*" />
                </div>
                <div>
                  <label htmlFor="petDescription" className="mx-2">
                    Description:
                  </label>
                  <textarea
                    name="petDescription"
                    id="petDescription"
                    placeholder="Description"
                    className="border-2 border-gray-400 border-solid h-10 w-40 px-2"
                  ></textarea>
                </div>
                <div className="flex justify-center items-center py-3">
                  <button
                    type="submit"
                    className="btn  bg-[#8ECDDD] hover:bg-[#FFFDF3] py-1 my-2 hover:bg-[#FFFDF3]"
                    name="submit-btn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        (window.location.href = '/login')
      )}
    </>
  )
}
