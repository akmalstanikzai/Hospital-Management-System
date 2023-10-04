import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>HMS</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <Link to="/articles" className="nav-item">Articles</Link>
              <Link to="/doctor" className="nav-item">Doctors</Link>
              <Link to="/appointmentbooking" className="nav-item">Appointment Bookings</Link>
              <Link to="/requests" className="nav-item">Requests</Link>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar