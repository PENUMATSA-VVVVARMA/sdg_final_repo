import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [activeForm, setActiveForm] = useState('lost');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    itemName: '',
    description: '',
    location: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create item with timestamp
    const newItem = {
      id: Date.now(),
      type: activeForm,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingItems = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
    existingItems.push(newItem);
    localStorage.setItem('lostFoundItems', JSON.stringify(existingItems));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      itemName: '',
      description: '',
      location: '',
      date: ''
    });
    
    // Navigate to items list
    navigate('/items');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
          🔍 Lost & Found Portal
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          Help reunite people with their belongings
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <button
          onClick={() => setActiveForm('lost')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            borderBottom: activeForm === 'lost' ? '3px solid #2563eb' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeForm === 'lost' ? '#2563eb' : '#6b7280',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          😢 I Lost Something
        </button>
        <button
          onClick={() => setActiveForm('found')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            borderBottom: activeForm === 'found' ? '3px solid #2563eb' : '3px solid transparent',
            backgroundColor: 'transparent',
            color: activeForm === 'found' ? '#2563eb' : '#6b7280',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          😄 I Found Something
        </button>
      </div>
      
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>
          {activeForm === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Item Name *</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Please provide a detailed description..."
              required
            />
          </div>
          
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder={activeForm === 'lost' ? 'Where did you lose it?' : 'Where did you find it?'}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {activeForm === 'lost' ? '📝 Submit Lost Item Report' : '📝 Submit Found Item Report'}
          </button>
        </form>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/items')}
          className="btn btn-success"
          style={{ marginRight: '1rem' }}
        >
          🔍 View All Items
        </button>
        <button
          onClick={() => navigate('/donations')}
          className="btn btn-primary"
        >
          💝 Support Us
        </button>
      </div>
    </div>
  );
};

export default Home;