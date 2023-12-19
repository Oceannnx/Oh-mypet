import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar'

export const Footer = () => {
  return (
    <footer className="hidden md:grid">
      <div className="bg-primaryColor">
        <div className="grid grid-cols-[6fr_2fr_2fr_1fr]">
          <div className="flex items-center">
            <img src="src/assets/Logo.png" alt="Logo" className="ml-16 w-32 object-cover my-3" />
          </div>
          <div className="flex my-4 justify-center ">
            <ul>
              <Link to="/">
                <h1
                  className="font-bold text-lg group transition duration-300 w-fit"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                  }}
                >
                  Main menu
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                </h1>
              </Link>
              <li className="dropdown dropdown-right dropdown-hover items-center py-3 select-none">
                Animal
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                <ul tabIndex={0} className="dropdown-content z-[1] -my-4 bg-[#F0F0F0] menu p-2 shadow w-36 rounded">
                  {Animals.map((animal, index) => {
                    return (
                      <li className="hover:bg-slate-400 rounded" key={animal.label + index}>
                        <Link to={animal.path}>{animal.label}</Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
              <Link to="/advidence">
                <li className="group transition duration-300 w-fit">
                  Advidence
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                </li>
              </Link>
              <div className="dropdown dropdown-right dropdown-hover items-center py-3">
                <label tabIndex={0} className="">
                  Post
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] bg-[#F0F0F0] menu p-3 shadow w-36 rounded">
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
              </div>
            </ul>
          </div>

          <div className="flex my-4 justify-center ">
            <ul>
              <h1 className="font-bold text-lg">Help</h1>
              <Link to="/contact">
                <li className="py-2 group transition duration-300">
                  Member
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                </li>
              </Link>
              <Link to="/faq">
                <li className="group transition duration-300 w-fit">
                  FAQ
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="text-sm text-center"> Oh-myPet v1.0 copyright © 2023</div>
            <div className="text-sm text-center"> This Project is for Study porpuse</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
