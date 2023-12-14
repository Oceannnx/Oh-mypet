import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar/index'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/user'
import { AxiosLib } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const logo = 'src/assets/Logo.png'
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const IsLogin = auth?.authContext.IsLogin || false
  const fName = auth?.authContext.fName || ''
  const [toggle, setToggle] = useState(false)

  const HandleLogout = async () => {
    try {
      const result = await AxiosLib.post('/api/user/logout')
      if (result.status === 200) return navigate(0)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setToggle(false)
  }, [])
  return (
    <>
      <nav className="lg:hidden bg-primaryColor z-10">
        <div className="flex justify-between">
          <div className="px-12 py-4">
            <Link to="/">
              <img src="src/assets/Logo.png" alt="Logo" width="72px" />
            </Link>
          </div>
          <div className="flex justify-center items-center px-12 py-4">
            <button
              onClick={() => {
                setToggle(!toggle)
              }}
            >
              {toggle ? (
                <img className="w-8" src="icons/arrow-up.svg" alt="Logo" width="72px" />
              ) : (
                <img className="w-8" src="icons/bar.svg" alt="Logo" width="72px" />
              )}
            </button>
          </div>
        </div>
        {toggle ? (
          <div>
            <div className="flex justify-center items-center ">
              <Link to="/" className="px-4 py-2">
                Home
              </Link>
            </div>
            {IsLogin ? (
              <>
                <div className="flex justify-center items-center">
                  <Link to={'/account/'}>
                    <div className="border-solid font-normal underline w-24  hover:text-[#FFFDF3]">{fName}</div>
                  </Link>
                </div>
                <div>
                  <button className="btn border-solid font-normal w-24 hover:bg-[#FFFDF3]" onClick={HandleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link to="/login">
                    <div className="btn border-solid font-normal w-24 hover:bg-[#FFFDF3]">Login</div>
                  </Link>
                </div>
                <div>
                  <Link to="/signup">
                    <div className="btn border-solid font-normal w-24 ml-4 hover:bg-[#FFFDF3]">Sign Up</div>
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </nav>
      <nav className="lg:flex hidden items-center justify-between bg-primaryColor">
        <div className="px-12 py-4">
          <Link to="/">
            <img src={logo} alt="Logo" width="96px" />
          </Link>
        </div>
        <div className="flex items-center border rounded-md bg-gray-100 mr-10 h-[45px] w-[850px]">
          <div className="flex mx-12 ">
            <div className="flex justify-center items-center my-3  hover:text-[#8ECDDD] ">
              <Link to="/" className="px-4 py-2">
                Home
              </Link>
            </div>
            <div className="flex justify-center my-3 dropdown dropdown-hover items-center mx-10 w-[100px]  ">
              <span>
                <label className="m-1 mx- hover:text-[#8ECDDD]">Aniamals</label>
                <ul className="dropdown-content z-[1] bg-[#F0F0F0] menu p-2 shadow w-36 rounded">
                  {Animals.map((animal, index) => {
                    return (
                      <li className="hover:bg-slate-400 rounded " key={animal.label + index}>
                        <Link to={animal.path}>{animal.label}</Link>
                      </li>
                    )
                  })}
                </ul>
              </span>
            </div>
            <div className="flex justify-center items-center my-3 w-[100px] hover:text-[#8ECDDD] ">
              <Link to="/advidence">Advidence</Link>
            </div>
            <div className="flex justify-center my-3 dropdown dropdown-hover items-center mx-10 w-[90px]  ">
              <span>
                <label tabIndex={0} className="m-1 mx-10 hover:text-[#8ECDDD]">
                  Post
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] bg-[#F0F0F0] menu p-2 shadow w-36 rounded">
                  <Link to="/newsellpost">
                    <li className="hover:bg-slate-400 rounded">
                      <a>Sell</a>
                    </li>
                  </Link>
                  <Link to="/newadvpost">
                    <li className="hover:bg-slate-400 rounded">
                      <a>Advidence</a>
                    </li>
                  </Link>
                </ul>
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x">
              {IsLogin ? (
                <>
                  <div className="flex justify-center items-center">
                    <Link to={'/account/me'}>
                      <div className="border-solid font-normal underline w-24  hover:text-[#8ECDDD]">{fName}</div>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="btn border rounded-full border-gray-500 bg-gray-200 my-3 font-normal ml-5 w-24 hover:bg-[#FFFDF3]"
                      onClick={HandleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link to="/login">
                      <div className="btn border-solid font-normal my-3 w-24 hover:bg-[#FFFDF3] border rounded-full border border-gray-500 bg-gray-200 ">
                        Login
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to="/signup">
                      <div className="btn border rounded-full border-gray-500 bg-gray-200 my-3 font-normal w-24  h-[40px] ml-4 hover:bg-[#FFFDF3]">
                        Sign Up
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
