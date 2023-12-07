import { Link, useLocation } from "react-router-dom";
import { FaBook, FaCloudSunRain} from "react-icons/fa";
import {FaArrowRightFromBracket, FaMagnifyingGlass} from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import "./navigation.css";

function Navigation() {
    const links = ["Home", "Search", "Profile", "Login", "Register"];
    const linkToIconMap = {
        Profile: <BiUserCircle className="navigation_icon" />,
        Home: <FaCloudSunRain className="navigation_icon" />,
        Search: <FaMagnifyingGlass className="navigation_icon" />,
        Login: <FaArrowRightFromBracket className="navigation_icon" />,
        Register: <FaBook className="navigation_icon"/>,
    };
    const { pathname } = useLocation();
    return (
        <div className="list-group navigation">
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/${link}`}
                    className={`list-group-item navigation_item ${pathname.includes(link) && "active"}`}>
                    {linkToIconMap[link]}
                    <br/>
                    {link}
                </Link>
            ))}
        </div>
    );
}
export default Navigation;