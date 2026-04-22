import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('El contenido no puede estar vacío');
      return;
    }
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await addDoc(collection(db, "posts"), {
        content: content,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp()
      });
      
      setSuccess('✅ ¡Publicación creada exitosamente!');
      setContent('');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Error al publicar: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2 className="form-title">✏️ Crear Nueva Publicación</h2>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">💭 ¿Qué quieres compartir?</label>
          <textarea
            className="form-textarea"
            placeholder="Escribe tu mensaje aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? '🔄 Publicando...' : '📢 Publicar'}
        </button>
      </form>
    </div>
  );
}