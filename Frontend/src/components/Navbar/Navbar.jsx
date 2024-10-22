import { Link, useNavigate } from "react-router-dom";
import { Search } from "./Search";
import "./navbar.css"
import { useAuth } from "../../context/AuthConext";

export function Navbar() {

  const { user, isAuthenticated, logout } = useAuth()

  const navigate = useNavigate()

  // Manejo de cierre de sesión
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

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
        <div className="item">
          <Search />
          {isAuthenticated && user && (
            <button className="logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )
          }
        </div>
      </header>
    </nav>
  )
}
