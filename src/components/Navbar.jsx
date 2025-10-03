// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-link">Home</NavLink>
        {user && <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>}
        {user && <NavLink to="/records" className="nav-link">My Records</NavLink>}
        {user && <NavLink to="/notifications" className="nav-link">Notifications</NavLink>}
        {user && <NavLink to="/upload" className="nav-link">Upload</NavLink>}
        {user && <NavLink to="/profile" className="nav-link">Profile</NavLink>}
        <NavLink to="/doctor" className="nav-link">Doctor Portal</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        {user ? (
          <button className="nav-link" onClick={onLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="nav-link">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
