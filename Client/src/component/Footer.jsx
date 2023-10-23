import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <>
            <label>© 2023 Shopee</label>
            <h1>Main Menu
                <ul>
                    <Link to='/'><li className="cursor-pointer">Main menu</li></Link>
                    <li className="dropdown dropdown-right">
                        <label tabIndex={0} className="m-1 mx-4 cursor-pointer">Animal</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <Link ><li>Cat</li></Link>
                            <Link ><li>Dog</li></Link>
                            <Link ><li>Birb</li></Link>
                            <Link ><li>Fish</li></Link>
                        </ul>
                    </li>
                    <Link to='/advidence'><li className="mx-4">Advidence</li></Link>
                    <li className="dropdown dropdown-right">
                        <label tabIndex={1} className="m-1">Animal</label>
                        <ul tabIndex={1} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <Link to='/newpetpost'><li>Sell</li></Link>
                            <Link to='/newadvpost'><li>Advidence</li></Link>
                        </ul>
                    </li>
                </ul>
            </h1>

            <h1>Other
                <ul>
                    <Link to='/contact'><li>Contact Us</li></Link>
                    <Link to='/help'><li>Help</li></Link>
                    <Link to='/faq'><li>FAQ</li></Link>
                </ul>
            </h1>
        </>
    )
}
