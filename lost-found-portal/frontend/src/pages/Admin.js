import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stats, setStats] = useState({ lost: 0, found: 0, total: 0 });

  const ADMIN_PASSWORD = 'varma@1706';

  useEffect(() => {
    // Check if admin is already authenticated
    const authTime = localStorage.getItem('adminAuthTime');
    if (authTime) {
      const timeDiff = Date.now() - parseInt(authTime);
      if (timeDiff < 30 * 60 * 1000) { // 30 minutes
        setIsAuthenticated(true);
        loadItems();
      } else {
        localStorage.removeItem('adminAuthTime');
      }
    }
  }, []);

  const loadItems = () => {
    const savedItems = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
    setItems(savedItems);
    
    // Calculate stats
    const lostCount = savedItems.filter(item => item.type === 'lost').length;
    const foundCount = savedItems.filter(item => item.type === 'found').length;
    setStats({
      lost: lostCount,
      found: foundCount,
      total: savedItems.length
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthTime', Date.now().toString());
      loadItems();
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthTime');
    setPassword('');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    setItems(updatedItems);
    localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
    setShowEditModal(false);
    setEditingItem(null);
    loadItems();
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
      loadItems();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1f2937' }}>
            🔒 Admin Login
          </h2>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937' }}>
          🔒 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{
          textAlign: 'center',
          backgroundColor: '#fef3c7',
          border: '2px solid #fbbf24'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#92400e' }}>{stats.lost}</h3>
          <p style={{ color: '#92400e', fontWeight: '600' }}>Lost Items</p>
        </div>
        
        <div className="card" style={{
          textAlign: 'center',
          backgroundColor: '#d1fae5',
          border: '2px solid #10b981'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#065f46' }}>{stats.found}</h3>
          <p style={{ color: '#065f46', fontWeight: '600' }}>Found Items</p>
        </div>
        
        <div className="card" style={{
          textAlign: 'center',
          backgroundColor: '#e0e7ff',
          border: '2px solid #2563eb'
        }}>
          <h3 style={{ fontSize: '2rem', color: '#1e40af' }}>{stats.total}</h3>
          <p style={{ color: '#1e40af', fontWeight: '600' }}>Total Items</p>
        </div>
      </div>
      
      {/* Items Table */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
          All Items Management
        </h2>
        
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            No items to manage yet.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Item</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Reporter</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Location</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} style={{
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                  }}>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        backgroundColor: item.type === 'lost' ? '#fbbf24' : '#10b981',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{item.itemName}</td>
                    <td style={{ padding: '1rem' }}>{item.name}</td>
                    <td style={{ padding: '1rem' }}>{item.location}</td>
                    <td style={{ padding: '1rem' }}>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          backgroundColor: '#2563eb',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '0.5rem',
                          fontSize: '0.875rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Edit Item</h3>
            
            <div className="form-group">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                value={editingItem.itemName}
                onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="form-textarea"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={editingItem.location}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                className="form-input"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;