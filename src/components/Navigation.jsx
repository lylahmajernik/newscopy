import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getUserSavedArticles } = useArticles();

  // Only fetch saved articles if logged in
  const savedArticles = isAuthenticated ? getUserSavedArticles() : [];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="nav-container">
        <h1 className="nav-brand">NewsReader</h1>

        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>
            Search
          </Link>

          {isAuthenticated && (
            <Link
              to="/saved"
              className={location.pathname === '/saved' ? 'active' : ''}
            >
              Saved Articles ({savedArticles.length})
            </Link>
          )}

          {isAdmin() && (
            <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
              Admin
            </Link>
          )}
        </div>

        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span>👤 {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;