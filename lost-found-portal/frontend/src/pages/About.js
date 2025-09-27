import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937', textAlign: 'center' }}>
          About Lost & Found Portal
        </h1>
        
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to the Lost & Found Portal, a community-driven platform designed to help people 
            reunite with their lost belongings and return found items to their rightful owners.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We believe that everyone deserves a second chance to recover their lost items. Whether it's 
            a wallet, keys, phone, or something with sentimental value, our portal provides a simple 
            and effective way to connect those who have lost something with those who have found it.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem' }}>
            How It Works
          </h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Report Lost Items:</strong> Fill out a detailed form describing what you lost, 
              where you lost it, and when it happened.
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Report Found Items:</strong> If you found something, describe it and where 
              you found it to help the owner locate it.
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Browse Items:</strong> Search through reported lost and found items to see 
              if your item has been reported.
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>QR Codes:</strong> Each item gets a unique QR code that can be easily shared 
              to help spread the word.
            </div>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem' }}>
            Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <strong>🔍 Easy Search:</strong>
              <br />Quick and intuitive search functionality
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <strong>📱 QR Codes:</strong>
              <br />Shareable QR codes for each item
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <strong>🔒 Admin Panel:</strong>
              <br />Manage items and monitor the system
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <strong>💝 Donations:</strong>
              <br />Support the platform's maintenance
            </div>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginTop: '2rem', marginBottom: '1rem' }}>
            Contact Information
          </h2>
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #dbeafe'
          }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>Developer:</strong> Jahnavi Penumatsa
            </p>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>Purpose:</strong> Community Service Initiative
            </p>
            <p style={{ margin: '0' }}>
              <strong>Support:</strong> Help us maintain this free service by making a donation
            </p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0' }}>
              Together, we can help lost items find their way home! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;