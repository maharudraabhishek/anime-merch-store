import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * The navigation bar appears at the top of every page.  It provides
 * links to the home page, cart and user actions.  A button in the
 * corner toggles between light and dark themes by calling
 * `toggleTheme` from ThemeContext【624978474302290†L257-L330】.  When a user is
 * logged in the navbar shows their username and a logout button.
 */
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-card text-foreground shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-heading text-primary">
          Anime<span className="text-secondary">Merch</span>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-primary">Cart</Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-accent/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </li>
          {user ? (
            <>
              <li className="text-sm">Hi, {user.username}</li>
              <li>
                <button onClick={handleLogout} className="underline text-sm text-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-primary text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary text-sm">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;