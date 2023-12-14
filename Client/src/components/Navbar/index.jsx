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
  const [animalToggle, setAnimalToggle] = useState(false)
  const [postToggle, setPostToggle] = useState(false)

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
      <nav className="xl:hidden bg-primaryColor z-10">
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
            <div className="flex justify-center items-center px-4 py-2 text-2xl">
              <Link to="/">Home</Link>
            </div>
            <div className="flex justify-center items-center  px-4 py-2 w-full ">
              <div
                onClick={() => {
                  setAnimalToggle(!animalToggle)
                }}
                className="flex flex-col justify-center items-center px-4 py-2 text-2xl w-full"
              >
                Animal
                {animalToggle ? (
                  <div className="mt-4 underline w-full">
                    {Animals.map((animal, index) => {
                      return (
                        <div className="py-2 text-xl text-center" key={animal.label + index}>
                          <Link to={animal.path}>{animal.label}</Link>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="flex justify-center items-center px-4 py-2 text-2xl">
              <Link to="/advidence">Advidence</Link>
            </div>
            <div>
              <div className="flex justify-center items-center py-2 w-full">
                <div
                  onClick={() => {
                    setPostToggle(!postToggle)
                  }}
                  className="flex flex-col justify-center items-center px-4 py-2 text-2xl w-full "
                >
                  Post
                  {postToggle ? (
                    <div className=" mt-4 underline w-full">
                      <Link to="/newsellpost">
                        <div className="py-2 text-xl text-center">Sell</div>
                      </Link>
                      <Link to="/newadvpost">
                        <div className="py-2 text-xl text-center">Advidence</div>
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {IsLogin ? (
              <>
                <div className="flex justify-center items-center px-4 py-2 text-center">
                  <Link to={'/account/me'}>
                    <div className="border-solid font-normal underline w-24 text-2xl">{fName}</div>
                  </Link>
                </div>
                <div className="flex justify-center items-center py-4">
                  <button className="text-center border-solid font-normal w-24 text-2xl" onClick={HandleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center px-4 py-2">
                  <Link to="/login">
                    <div className="text-center border-solid font-normal w-24 text-2xl">Login</div>
                  </Link>
                </div>
                <div className="flex justify-center items-center px-4 py-2">
                  <Link to="/signup">
                    <div className="text-center border-solid font-normal w-24 text-2xl">Sign Up</div>
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </nav>
      <nav className="xl:flex hidden items-center justify-between bg-primaryColor text-xl">
        <div className="px-12 py-4">
          <Link to="/">
            <img src={logo} alt="Logo" width="96px" />
          </Link>
        </div>
        <div className="flex mx-12 ">
          <div className="flex justify-center items-center">
            <Link className="group px-8 transition duration-300" to="/">
              Home
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
          </div>
          <div className="flex justify-center dropdown dropdown-hover items-center mx-10">
            <span>
              <label className="m-1 mx-10">Aniamals</label>
              <ul className="dropdown-content z-[1] bg-[#F0F0F0] menu p-2 shadow w-36 rounded">
                {Animals.map((animal, index) => {
                  return (
                    <li className="hover:bg-slate-400 rounded text-base" key={animal.label + index}>
                      <Link to={animal.path}>{animal.label}</Link>
                    </li>
                  )
                })}
              </ul>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Link className="group px-8 transition duration-300" to="/advidence">
              Advidence
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
            </Link>
          </div>
          <div className="flex justify-center dropdown dropdown-hover items-center mx-10 ">
            <span>
              <label tabIndex={0} className="m-1 mx-10">
                Post
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] bg-[#F0F0F0] menu p-2 shadow w-36">
                <Link to="/newsellpost">
                  <li className="hover:bg-slate-400 rounded text-base">
                    <a>Sell</a>
                  </li>
                </Link>
                <Link to="/newadvpost">
                  <li className="hover:bg-slate-400 rounded text-base">
                    <a>Advidence</a>
                  </li>
                </Link>
              </ul>
            </span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-secondaryColor">
            {IsLogin ? (
              <>
                <div className="flex justify-center items-center py-3">
                  <Link to={'/account/me'} className="group mx-8 transition duration-300">
                    {fName}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center">
                  <button className="group mx-8 transition duration-300" onClick={HandleLogout}>
                    Logout
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center text-center py-3">
                  <Link className="group mx-8 transition duration-300" to="/login">
                    Login
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center">
                  <Link className="group mx-8 transition duration-300" to="/signup">
                    Sign Up
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
