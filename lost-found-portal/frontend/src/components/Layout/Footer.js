import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      textAlign: 'center',
      padding: '2rem 1rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
            Lost & Found Portal
          </h3>
          <p style={{ margin: '0', color: '#9ca3af' }}>
            Helping reunite people with their belongings
          </p>
        </div>
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '1rem',
          fontSize: '0.875rem',
          color: '#9ca3af'
        }}>
          <p style={{ margin: '0' }}>
            © 2025 Lost & Found Portal. Built with ❤️ for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;