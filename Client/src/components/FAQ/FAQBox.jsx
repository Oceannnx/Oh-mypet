import { useState } from 'react'
import PropTypes from 'prop-types'

export const FAQBox = (props) => {
  const { label, content } = props || { label: '', content: '' }

  const [toggle, setToggle] = useState(false)

  const HandleHamburger = () => {
    setToggle(!toggle)
  }
  return (
    <section>
      <div className="rounded-xl border-2 border-black m-4">
        <div className="h-12 grid grid-cols-[8fr_1fr] items-center my-4">
          <h1 className="mx-4 font-bold text-md">{label}</h1>
          <button onClick={HandleHamburger}>
            {!toggle ? (
              <img src="icons/arrow-down.svg" className="w-8 h-8" alt="" />
            ) : (
              <img src="icons/arrow-up.svg" className="" alt="" />
            )}
          </button>
        </div>
        {toggle ? (
          <div className="px-4 mb-4">
            {content.map((item, index) => {
              return (
                <div key={item + index} className="mb-2">
                  <div
                    onClick={() => {
                      props.handleOnclick(item.question, item.ans)
                      if (props.isMobile) {
                        window.scrollTo({ top: 800, left: 0, behavior: 'smooth' })
                      }
                    }}
                    className=""
                  >
                    {item.question}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
}

FAQBox.propTypes = {
  label: PropTypes.string,
  content: PropTypes.array,
  handleOnclick: PropTypes.func,
  isMobile: PropTypes.bool,
}
