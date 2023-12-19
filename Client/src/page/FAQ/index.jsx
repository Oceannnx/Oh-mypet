import { FAQContents } from '../../contents/FAQ/index'
import { FAQBox } from '../../components/FAQ/FAQBox'
import { Footer } from '../../components/Footer'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'

export const FAQ = () => {
  const [label, setLabel] = useState('')
  const [answer, setAnswer] = useState('')
  const [isMobile, setIsMobile] = useState('')
  const mobileMediaQuery = window.matchMedia('(max-width: 768px)')

  const handleMobileChange = (event) => {
    setIsMobile(event.matches)
  }
  const handleOnclick = (question, ans) => {
    setLabel(question)
    setAnswer(ans)
  }
  useEffect(() => {
    mobileMediaQuery.addEventListener('change', handleMobileChange)
    setIsMobile(mobileMediaQuery.matches)
    return () => {
      mobileMediaQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])
  return (
    <>
      <div className="grid md:grid-cols-[2fr_6fr] grid-cols-1 divide-x-4 divide-slate-300 bg-secondaryColor">
        <div className="w-full my-6">
          <h1 className="text-center font-bold text-2xl ">คำถามที่ถูกถามบ่อย</h1>
          <div className="md:grid md:grid-cols-1 w-full md:mx-auto md:max-w-5xl grid-cols-1">
            {FAQContents.map((FAQContent, index) => {
              return (
                <FAQBox
                  key={FAQContent.label + index}
                  label={String(FAQContent.label)}
                  content={FAQContent.content}
                  isMobile={isMobile}
                  handleOnclick={handleOnclick}
                />
              )
            })}
          </div>
        </div>
        <div className="bg-secondaryColor h-screen w-auto flex justify-center">
          <div className="m-6 p-12 w-full border border-gray-400">
            <div className="md:text-4xl text-2xl py-6">{label}</div>
            <div className="md:text-xl text-base">{parse(answer)}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
