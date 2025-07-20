import { Link } from 'react-router-dom'
import HoursDisplay from './HoursDisplay'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>🍧 Sweet Ice Delights</h1>
          </Link>
        </div>

        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/flavors">Flavors</Link></li>
            <li><Link to="/hours">Hours</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="header-hours">
          <HoursDisplay compact={true} />
        </div>
      </div>
    </header>
  )
}

export default Header
