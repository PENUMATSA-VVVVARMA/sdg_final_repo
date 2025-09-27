import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        fontSize: '6rem',
        marginBottom: '1rem'
      }}>
        🤔
      </div>
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        404 - Page Not Found
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: '#6b7280',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Oops! It looks like this page has gone missing, just like a lost item.
        But don't worry, we can help you find your way back!
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ textDecoration: 'none' }}
        >
          🏠 Go Home
        </Link>
        
        <Link
          to="/items"
          className="btn btn-success"
          style={{ textDecoration: 'none' }}
        >
          🔍 Browse Items
        </Link>
      </div>
      
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{
          margin: '0',
          color: '#374151',
          fontSize: '0.875rem'
        }}>
          If you think this page should exist, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;