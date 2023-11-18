import { useState, useEffect } from 'react'
import { AxiosLib } from '../../lib/axios'
import { Footer } from '../../components/Footer'
import { useParams } from 'react-router-dom'

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
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSellpost()
  }, [])
  const postDate = new Date(sellpost[0]?.petPostDate)
  const BD = new Date(sellpost[0]?.petBD)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue1"></div>
        </div>
      ) : (
        <div>
          <div>{sellpost[0].petAge}</div>
          <div>{BD.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div>{sellpost[0].petDescription}</div>
          <div>{sellpost[0].petGender}</div>
          <div>{sellpost[0].petGene}</div>
          <img src={sellpost[0].petImages}></img>
          <div>{sellpost[0].petLocation}</div>
          <div>{sellpost[0].petName}</div>
          <div>{postDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div>{sellpost[0].petPrice}</div>
          <div>{sellpost[0].petType}</div>
          <div>{sellpost[0].title}</div>
          <div>
            {sellpost[0].user.fName} {sellpost[0].user.lName}
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  )
}
