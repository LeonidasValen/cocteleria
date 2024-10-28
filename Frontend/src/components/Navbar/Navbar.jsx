import { Link, useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css"

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
        <Link to={"/"} className="navLogo">
          <img src="/icons/logo.png" alt="logo" />
        </Link>
        <ul className="navItems">
          <li><Link to="/?cat=Alcohol">Alcohol</Link></li>
          <li><Link to="/?cat=Notalcohol">Sin alcohol</Link></li>
          <li><Link to="/?cat=Aperitivos">Aperitivos</Link></li>
          <li><Link to="/?cat=Fuerte">Fuerte</Link></li>
          <li><Link to="/?cat=Facil">Fácil</Link></li>
        </ul>
        <div className="item">
          {/* <Search /> */}
          {isAuthenticated && user && (
            <>
            <button className="logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <Link to="/formCoctel">Agregar cóctel</Link>
            </>
          )
          }
        </div>
      </header>
    </nav>
  )
}
