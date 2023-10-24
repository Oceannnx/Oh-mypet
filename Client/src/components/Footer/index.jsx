import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar'

export const Footer = () => {
  return (
    <footer className="">
      <label>© 2023 Shopee</label>
      <h1>
        Main Menu
        <ul>
          <Link to="/">
            <li className="cursor-pointer">Main menu</li>
          </Link>
          <li className="dropdown dropdown-hover items-center">
            <label tabIndex={0} className="m-1 mx-4 cursor-pointer">
              Animal
            </label>
            {/* <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"> */}
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
            <li className="mx-4">Advidence</li>
          </Link>
          <li className="dropdown dropdown-right">
            <label tabIndex={1} className="m-1">
              Animal
            </label>
            <ul tabIndex={1} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <Link to="/newpetpost">
                <li>Sell</li>
              </Link>
              <Link to="/newadvpost">
                <li>Advidence</li>
              </Link>
            </ul>
          </li>
        </ul>
      </h1>

      <h1>
        Other
        <ul>
          <Link to="/contact">
            <li>Contact Us</li>
          </Link>
          <Link to="/help">
            <li>Help</li>
          </Link>
          <Link to="/faq">
            <li>FAQ</li>
          </Link>
        </ul>
      </h1>
    </footer>
  )
}
