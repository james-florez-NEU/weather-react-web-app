import { Link, useLocation } from "react-router-dom";
import { FaBook} from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import "./navigation.css";
function Navigation() {
    const links = ["Account", "Home", "Search"];
    const linkToIconMap = {
        Account: <BiUserCircle className="navigation_icon_user align-content-center" />,
        Home: <RiDashboard3Fill className="navigation_icon" />,
        Search: <FaBook className="navigation_icon" />,
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