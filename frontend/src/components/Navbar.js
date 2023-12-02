import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Hospital</h1>
        </Link>
        <Link to="/articles">
          <h1 className="navbar-option">Articles</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar