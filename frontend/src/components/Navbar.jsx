import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ShoppingCart, User, LogOut, Package, History } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/marketplace')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/marketplace" className="navbar-brand">
          <Package className="brand-icon" />
          <span>MarketPlace</span>
        </Link>

        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <User className="nav-icon" />
                <span>Dashboard</span>
              </Link>
              
              <Link to="/purchase-history" className="nav-link">
                <History className="nav-icon" />
                <span>History</span>
              </Link>
              
              <Link to="/cart" className="nav-link cart-link">
                <ShoppingCart className="nav-icon" />
                <span>Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="cart-badge">{getCartItemCount()}</span>
                )}
              </Link>
              
              <button onClick={handleLogout} className="nav-link logout-btn">
                <LogOut className="nav-icon" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link register-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
