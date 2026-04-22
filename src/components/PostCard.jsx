import React from 'react';

export default function PostCard({ post }) {
  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="post-card">
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <div className="post-author">
          <div className="post-author-icon">
            {getInitials(post.authorEmail)}
          </div>
          <span>{post.authorEmail}</span>
        </div>
        <div className="post-date">
          📅 {post.createdAt ? formatDate(post.createdAt) : 'Recién publicado'}
        </div>
      </div>
    </div>
  );
}