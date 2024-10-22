import { Link } from "react-router-dom";
import { Search } from "./Search";
import "./navbar.css"

export function Navbar() {
  return (
    <nav className="navbar">
      <header className="navHeader">
        <div className="navLogo">
          <img src="./icons/logo.png" alt="logo" />
        </div>
        <ul className="navItems">
          <li><Link to="/">Alcohol</Link></li>
          <li><Link to="/">Sin alcohol</Link></li>
          <li><Link to="/">Aperitivos</Link></li>
          <li><Link to="/">Fuerte</Link></li>
          <li><Link to="/">Fácil</Link></li>
        </ul>
        <Search />
      </header>
    </nav>
  )
}
