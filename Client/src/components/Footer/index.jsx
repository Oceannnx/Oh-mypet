import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar'

export const Footer = () => {
  return (
    <footer>
      <div className="bg-primaryColor">
        <div className="grid grid-cols-[4fr_2fr_2fr_1fr]">
          <div className="flex items-center">
            <img src="src/assets/Logo.png" alt="Logo" className="ml-16 w-32 object-cover my-3" />
          </div>
          <div className="flex my-4 justify-center">
            <ul>
              <Link to="/">
                <h1 className="font-bold text-lg">Main menu</h1>
              </Link>
              <li className="dropdown dropdown-top dropdown-hover items-center">
                Animal
                <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow w-36 rounded">
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
                <li>Advidence</li>
              </Link>
              <div className="dropdown dropdown-top dropdown-hover items-center">
                <span>
                  <label tabIndex={0}>Post</label>
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
            </ul>
          </div>

          <div className="flex my-4 justify-center">
            <ul>
              <h1 className="font-bold text-lg">Help</h1>
              <Link to="/contact">
                <li>Contact Us</li>
              </Link>
              <Link to="/faq">
                <li>FAQ</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="text-sm text-center"> Oh-mypet copyright © 2023</div>
            <div className="text-sm text-center"> This Project is for Study porpuse</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
