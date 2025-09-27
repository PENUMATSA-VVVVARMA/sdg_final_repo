import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const loadItems = () => {
      const savedItems = JSON.parse(localStorage.getItem('lostFoundItems') || '[]');
      setItems(savedItems);
    };
    
    loadItems();
    // Refresh items when localStorage changes
    window.addEventListener('storage', loadItems);
    return () => window.removeEventListener('storage', loadItems);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleShowQR = (item) => {
    setSelectedItem(item);
    setShowQRModal(true);
  };

  const QRModal = ({ item, isOpen, onClose }) => {
    if (!isOpen) return null;
    
    const itemUrl = `${window.location.origin}/items/${item.id}`;
    
    return (
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
          textAlign: 'center',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
            QR Code for {item.itemName}
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <QRCode
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={itemUrl}
              viewBox={`0 0 200 200`}
            />
          </div>
          
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Share this QR code to help spread the word about this {item.type} item.
          </p>
          
          <button
            onClick={onClose}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
          All Reported Items
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          Browse through lost and found items reported by the community
        </p>
      </div>
      
      {/* Filters and Search */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem'
          }}
        >
          <option value="all">All Items</option>
          <option value="lost">Lost Items</option>
          <option value="found">Found Items</option>
        </select>
        
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            minWidth: '300px'
          }}
        />
      </div>
      
      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {items.length === 0 ? '🔍' : '🤔'}
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>
            {items.length === 0 ? 'No Items Reported Yet' : 'No Items Match Your Search'}
          </h3>
          <p style={{ color: '#6b7280' }}>
            {items.length === 0 
              ? 'Be the first to report a lost or found item!'
              : 'Try adjusting your search terms or filters.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {filteredItems.map((item) => (
            <div key={item.id} className="card" style={{
              border: item.type === 'lost' ? '2px solid #fbbf24' : '2px solid #10b981'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{
                  backgroundColor: item.type === 'lost' ? '#fbbf24' : '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {item.type === 'lost' ? '😢 LOST' : '😄 FOUND'}
                </span>
                <button
                  onClick={() => handleShowQR(item)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                  title="Show QR Code"
                >
                  📱
                </button>
              </div>
              
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1f2937'
              }}>
                {item.itemName}
              </h3>
              
              <p style={{
                color: '#6b7280',
                marginBottom: '0.75rem',
                lineHeight: '1.4'
              }}>
                {item.description.length > 100 
                  ? `${item.description.substring(0, 100)}...` 
                  : item.description
                }
              </p>
              
              <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                <div style={{ marginBottom: '0.25rem' }}>
                  <strong>📍 Location:</strong> {item.location}
                </div>
                <div style={{ marginBottom: '0.25rem' }}>
                  <strong>📅 Date:</strong> {new Date(item.date).toLocaleDateString()}
                </div>
                <div style={{ marginBottom: '0.25rem' }}>
                  <strong>📧 Contact:</strong> {item.email}
                </div>
                {item.phone && (
                  <div>
                    <strong>📞 Phone:</strong> {item.phone}
                  </div>
                )}
              </div>
              
              <div style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #e5e7eb',
                fontSize: '0.75rem',
                color: '#9ca3af'
              }}>
                Reported by: {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* QR Code Modal */}
      <QRModal 
        item={selectedItem} 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)}
      />
    </div>
  );
};

export default ItemsList;