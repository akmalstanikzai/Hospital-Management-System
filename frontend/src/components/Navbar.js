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
          <h2>HMS</h2>
        </Link>
        <nav>
          {user && (
            <div className="navbar-div">
              <div className="navbar-divv">
                <Link to="/articles" className="nav-item">Articles</Link>
                <Link to="/doctor" className="nav-item">Doctors</Link>
                <Link to="/appointmentbooking" className="nav-item">Booking</Link>
                <Link to="/requests" className="nav-item">Requests</Link>
                <Link to="/meetings" className="nav-item">Meetings</Link>
              </div>      
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