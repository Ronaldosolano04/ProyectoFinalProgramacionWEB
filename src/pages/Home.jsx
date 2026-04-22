import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="home-header">
          <h1 className="home-title">Muro Interactivo</h1>
          <p className="home-subtitle">UniversidadMural - Comparte tus ideas</p>
        </div>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1 className="home-title">🎨 Muro Interactivo</h1>
        <p className="home-subtitle">UniversidadMural - Donde las ideas cobran vida</p>
      </div>
      
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">No hay publicaciones aún. ¡Sé el primero en compartir algo!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}