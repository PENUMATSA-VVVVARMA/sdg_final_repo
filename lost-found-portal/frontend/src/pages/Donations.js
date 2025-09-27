import React, { useState } from 'react';

const Donations = () => {
  const [message, setMessage] = useState('');
  const RAZORPAY_PAYMENT_LINK = 'https://razorpay.me/@penumatsajahnavi';

  const handlePayment = (e) => {
    e.preventDefault();
    window.open(RAZORPAY_PAYMENT_LINK, '_blank');
    setMessage('🚀 Payment window opened! After completing payment, close that tab and click "Return to Home Page" below.');
    setTimeout(() => setMessage(''), 15000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <span style={{ color: 'white', fontSize: '2rem' }}>💝</span>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#1f2937'
          }}>Support Our Mission</h1>
          <p style={{
            fontSize: '1.125rem',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            Help us keep the Lost & Found Portal running and help more people reunite with their belongings. 
            Your donation directly supports Jahnavi's initiative to make this community service possible.
          </p>
        </div>

        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#1f2937'
          }}>Your donation helps:</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            fontSize: '14px',
            color: '#374151'
          }}>
            <span style={{ color: '#10b981' }}>✓</span>
            <span>Maintain and improve the portal technology</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            fontSize: '14px',
            color: '#374151'
          }}>
            <span style={{ color: '#10b981' }}>✓</span>
            <span>Support community outreach programs</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            fontSize: '14px',
            color: '#374151'
          }}>
            <span style={{ color: '#10b981' }}>✓</span>
            <span>Help more people find their lost items</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            fontSize: '14px',
            color: '#374151'
          }}>
            <span style={{ color: '#10b981' }}>✓</span>
            <span>Keep the service free for everyone</span>
          </div>
        </div>

        {message && (
          <div style={{
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '1rem',
            backgroundColor: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0'
          }}>{message}</div>
        )}

        <form onSubmit={handlePayment}>
          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1rem',
            transition: 'background-color 0.2s'
          }}>
            💝 Donate via Razorpay
          </button>
          
          <div style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              🔒 Secure payment powered by Razorpay
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              You will enter your donation amount on the Razorpay payment page
            </div>
            <div>
              Supports UPI, Cards, NetBanking, and Wallets
            </div>
          </div>
        </form>

        <a href="/" style={{
          width: '100%',
          backgroundColor: '#059669',
          color: 'white',
          padding: '12px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          🏠 Return to Home Page
        </a>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fffbeb',
          border: '1px solid #fed7aa',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#92400e'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            📋 After Payment Instructions:
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            1. Complete your payment on the Razorpay page
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            2. Close the payment tab when done
          </div>
          <div>
            3. Click "Return to Home Page" above to go back to the portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;