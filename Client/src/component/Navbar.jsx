import './Navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
      <div className='bg-slate-200 flex justify-end sticky top-0'>
      <Link to='/'><div className='btn border-none font-normal mx-10'>Home</div></Link>
        <div className="dropdown dropdown-hover items-center mx-10">
        <label tabIndex={0} className="m-1 mx-10">Animal</label>
          <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow bg-base-100 w-36 rounded">
            <li className="hover:bg-slate-400 rounded"><a>Cat</a></li>
            <li className="hover:bg-slate-400 rounded"><a>Dog</a></li>
            <li className="hover:bg-slate-400 rounded"><a>Birb</a></li>
            <li className="hover:bg-slate-400 rounded"><a>Fish</a></li>
          </ul>
        </div>
        <Link to='/advidence'><div className='btn border-none font-normal px-10'>Advidence</div></Link>
        <div className="dropdown dropdown-hover items-center mx-10">
        <label tabIndex={0} className="m-1 mx-10">Post</label>
          <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow bg-base-100 w-36 rounded">
            <Link to= '/newpetpost'><li className="hover:bg-slate-400 rounded"><a>Sell</a></li></Link>
            <Link to= '/newadvpost'><li className="hover:bg-slate-400 rounded"><a>Advidence</a></li></Link>
          </ul>
        </div>
        <Link to='/login'><div className='btn ml-10 mr-5 border-solid font-normal w-24'>Login</div></Link>
        <div className='w-1 items-center bg-stone-400'></div>
        <Link to='/signup'><div className='btn ml-5 mr-10 border-solid font-normal w-24'>Sign Up</div></Link>
      </div>
    </>

  )
}
