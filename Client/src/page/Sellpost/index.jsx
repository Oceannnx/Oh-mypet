import { useState, useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import { Footer } from '../../components/Footer'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const Sellpost = () => {
  const [sellpost, setSellpost] = useState({})
  const { postId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const fetchSellpost = async () => {
    try {
      const result = await AxiosLib.get(`/api/sellpost/${postId}`)
      setSellpost(result.data)
      setIsLoading(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }
  const handleOnclickProfile = () => {
    navigate(`/account/${sellpost[0].userID}`)
  }
  useEffect(() => {
    fetchSellpost()
  }, [])
  const postDate = new Date(sellpost[0]?.petPostDate)
  const BD = new Date(sellpost[0]?.petBD)
  return (
    <>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen bg-[#FFFDF3]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
          </div>
        ) : (
          <div className="grid grid-col-1 xl:grid-cols-2 m-6">
            <div className="flex flex-col border-4 rounded-lg p-5">
              <div className="flex pb-4">
                <img
                  className="xl:rounded-lg rounded-md w-11 h-11 xl:w-20 xl:h-20 cursor-pointer"
                  onClick={handleOnclickProfile}
                  src={`https://avatar.vercel.sh/${sellpost[0].user.fName + sellpost[0].user.lName}.svg?text=${
                    sellpost[0].user.fName[0] + sellpost[0].user.lName[0]
                  }`}
                ></img>
                <div className="xl:px-6 px-3">
                  <div onClick={handleOnclickProfile} className="xl:text-xl text-lg cursor-pointer">
                    {sellpost[0].user.fName} {sellpost[0].user.lName}
                  </div>
                  <div className="xl:text-base text-sm">
                    {postDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full ">
                <img className="w-1/2 xl:w-3/4 " src={sellpost[0].petImages}></img>
              </div>
            </div>
            <divv className="flex flex-col p-5">
              <div className="grid grid-cols-2 divide-x-2">
                <div className="xl:px-10 px-4 border border-solid">
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Title : </div>
                    <div>{sellpost[0].title}</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Name : </div>
                    <div>{sellpost[0].petName}</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Age : </div>
                    <div>{sellpost[0].petAge}</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Birthday : </div>
                    <div className=" hidden xl:flex">
                      {BD.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex xl:hidden">
                      {BD.toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Gender : </div>
                    <div>{sellpost[0].petGender}</div>
                  </div>
                </div>
                <div className="xl:px-10 px-4 border border-solid border-t-2 border-b-2 border-blue-1">
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Location : </div>
                    <div>{sellpost[0].petLocation}</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Price : </div>
                    <div>{sellpost[0].petPrice} $</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">type : </div>
                    <div>{sellpost[0].petType}</div>
                  </div>
                  <div className="flex py-4 lg:text-xl text-sm">
                    <div className="pr-4">Gene : </div>
                    <div>{sellpost[0].petGene}</div>
                  </div>
                </div>
              </div>
              <div className="flex py-4 lg:text-xl text-sm border  border-t-2 border-b-2 border-blue1">
                <div className="pr-4 px-9">Description : </div>
                <div>{sellpost[0].petDescription}</div>
              </div>
            </divv>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  )
}
