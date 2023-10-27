import { Link } from 'react-router-dom'
import { Animals } from '../../contents/Navbar/index'

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue1">
      <div className="mx-12 my-4">
        <img src="src/assets/Logo.png" alt="Logo" width="96" />
      </div>

      <div className="flex mx-12">
        <div className="flex justify-center items-center">
          <Link to="/" className="px-4 py-2">
            Home
          </Link>
        </div>
        <div className="flex justify-center dropdown dropdown-hover items-center mx-10">
          <span>
            <label tabIndex={0} className="m-1 mx-10">
              Aniamals
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow w-36 rounded">
              {Animals.map((animal, index) => {
                return (
                  <li className="hover:bg-slate-400 rounded" key={animal.label + index}>
                    <Link to={animal.path}>{animal.label}</Link>
                  </li>
                )
              })}
            </ul>
          </span>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/advidence">Advidence</Link>
        </div>
        <div className="flex justify-center dropdown dropdown-hover items-center mx-10">
          <span>
            <label tabIndex={0} className="m-1 mx-10">
              Post
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow w-36 rounded">
              <Link to="/newpetpost">
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
          <div>
            <Link to="/login">
              <div className="btn border-solid font-normal w-24">Login</div>
            </Link>
          </div>
          <div>
            <Link to="/signup">
              <div className="btn border-solid font-normal w-24">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
