import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">🔐 Iniciar Sesión</h2>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">📧 Correo electrónico</label>
          <input
            type="email"
            className="form-input"
            placeholder="ejemplo@itla.edu.do"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">🔒 Contraseña</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? '🔄 Iniciando sesión...' : '🚀 Iniciar Sesión'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
        ¿No tienes cuenta?{' '}
        <Link to="/register" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}