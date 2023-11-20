import { useState } from 'react'

export const FAQBox = (props) => {
  const { label, content } = props || { label: '', content: '' }

  const [toggle, setToggle] = useState(false)

  const HandleHamburger = () => {
    setToggle(!toggle)
  }
  return (
    <section className="">
      <div className="rounded-xl border-2 border-black m-4">
        <div className="h-12 grid grid-cols-[8fr_1fr] items-center my-4">
          <h1 className="mx-4 font-bold text-md">{label}</h1>
          <button onClick={HandleHamburger}>
            {!toggle ? (
              <img src="icons/arrow-down.svg" className="" alt="" />
            ) : (
              <img src="icons/arrow-up.svg" className="" alt="" />
            )}
          </button>
        </div>
        {toggle ? <div className="px-4 mb-4">{content}</div> : <></>}
      </div>
    </section>
  )
}
