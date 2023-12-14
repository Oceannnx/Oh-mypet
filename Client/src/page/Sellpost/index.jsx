import { useState, useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import { Footer } from '../../components/Footer'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const Sellpost = () => {
  const [sellpost, setSellpost] = useState({})
  const { postId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
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
  useEffect(() => {
    fetchSellpost()
  }, [])
  const postDate = new Date(sellpost[0]?.petPostDate)
  const BD = new Date(sellpost[0]?.petBD)
  return (
    <>
      <div className="h-screen bg-[#FFFDF3]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen bg-[#FFFDF3]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2">
              <div className="flex justify-start py-5">
                <div className="flex justify-center">
                  {sellpost[0].user.fName} {sellpost[0].user.lName}
                </div>
                <div className=" flex justify-center items-center">
                  <img src={sellpost[0].petImages}></img>
                </div>
              </div>
              <div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].title}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petAge}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">
                  {BD.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petDescription}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petGender}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petGene}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petLocation}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petName}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">
                  {postDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petPrice}</div>
                <div className="border rounded-md border-gray-400 my-3 w-[300px]">{sellpost[0].petType}</div>
                <a href="https://www.blacklistseller.com/report/report_search_page" className="text-red-600 text-3xl">
                  {' '}
                  Check Blacklist !!!
                </a>
                <div className="flex my-3">
                  {sellpost[0].user.facebook === null ? (
                    <></>
                  ) : (
                    <a className="w-12 mx-1" href={sellpost[0].user.facebook}>
                      <img src="\src\assets\facebook.png"></img>
                    </a>
                  )}
                  {sellpost[0].user.line === null ? (
                    <></>
                  ) : (
                    <a className="w-12 mx-1" href={sellpost[0].user.line}>
                      <img src="\src\assets\line.png"></img>
                    </a>
                  )}
                  {sellpost[0].user.twitter === null ? (
                    <></>
                  ) : (
                    <a className="w-12 mx-1" href={sellpost[0].user.twitter}>
                      <img src="\src\assets\twitter.png"></img>
                    </a>
                  )}
                  {sellpost[0].user.instagram === null ? (
                    <></>
                  ) : (
                    <a className="w-12 mx-1" href={sellpost[0].user.instagram}>
                      <img src="\src\assets\instagram.png"></img>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  )
}
