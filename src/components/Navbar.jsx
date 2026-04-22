import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎓 UniversidadMural
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">🏠 Inicio</Link>
          
          {!currentUser ? (
            <>
              <Link to="/login" className="navbar-link">🔐 Iniciar Sesión</Link>
              <Link to="/register" className="navbar-link">📝 Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="navbar-link">✏️ Nueva Publicación</Link>
              <span className="navbar-user">👤 {currentUser.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="btn-logout">
                🚪 Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}