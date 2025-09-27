// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API utility functions
class API {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Items endpoints
  static async getAllItems() {
    return this.request('/items');
  }

  static async createItem(itemData) {
    return this.request('/items', {
      method: 'POST',
      body: itemData,
    });
  }

  static async updateItem(id, itemData) {
    return this.request(`/items/${id}`, {
      method: 'PUT',
      body: itemData,
    });
  }

  static async deleteItem(id) {
    return this.request(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  static async getItemById(id) {
    return this.request(`/items/${id}`);
  }

  // Search functionality
  static async searchItems(query) {
    return this.request(`/items/search?q=${encodeURIComponent(query)}`);
  }
}

export default API;