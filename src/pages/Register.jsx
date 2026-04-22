import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        nombre,
        apellido,
        email,
        usuario: email.split('@')[0]
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError('Error al crear la cuenta: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">📝 Crear Cuenta</h2>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">👤 Nombre</label>
          <input
            type="text"
            className="form-input"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">👥 Apellido</label>
          <input
            type="text"
            className="form-input"
            placeholder="Tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        
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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? '🔄 Creando cuenta...' : '✅ Registrarse'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}