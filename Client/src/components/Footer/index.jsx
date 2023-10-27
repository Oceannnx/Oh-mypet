import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar'

export const Footer = () => {
  return (
    <footer className="grid grid-cols-[5fr_2fr_2fr_1fr] bg-blue1">
      <div className="flex items-center">
        <img src="src/assets/Logo.png" alt="Logo" className="ml-16 w-32 object-cover my-3" />
      </div>

      <div className="flex my-4 justify-center">
        <ul>
          <Link to="/">
            <h1 className="font-bold text-lg">Main menu</h1>
          </Link>
          <li className="dropdown dropdown-hover items-center">
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
          <Link to="/post">
            <li>Post</li>
          </Link>
        </ul>
      </div>

      <div className="flex my-4 justify-center">
        <ul>
          <Link to="/help">
            <h1 className="font-bold text-lg">Help</h1>
          </Link>
          <Link to="/contact">
            <li>Contact Us</li>
          </Link>
          <Link to="/faq">
            <li>FAQ</li>
          </Link>
        </ul>
      </div>
    </footer>
  )
}
