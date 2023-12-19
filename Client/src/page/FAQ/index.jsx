import { FAQContents } from '../../contents/FAQ/index'
import { FAQBox } from '../../components/FAQ/FAQBox'
import { Footer } from '../../components/Footer'

export const FAQ = () => {
  return (
    <>
      <div className="h-screen bg-[#FFFDF3] container mx-auto py-5">
        <h1 className="text-center font-bold text-2xl">คำถามที่ถูกถามบ่อย</h1>
        <div className="md:grid md:grid-cols-3 md:mx-auto md:max-w-5xl grid-cols-1">
          {FAQContents.map((FAQContent, index) => {
            return (
              <FAQBox key={FAQContent.label + index} label={String(FAQContent.label)} content={FAQContent.content} />
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
