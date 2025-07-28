import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        
        <Link to="/" className="logo">
          🍧 Sweet Ice Delights
        </Link>
        
        <Link to="/flavors" className="nav-link">Flavors</Link>
        <Link to="/hours" className="nav-link">Hours</Link>
        <span className="status closed">● Closed</span>
      </nav>
    </header>
  );
};

export default Header;
