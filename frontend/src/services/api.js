const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Auth API methods
  auth = {
    register: (userData) => this.post('/auth/register', userData),
    login: (credentials) => this.post('/auth/login', credentials),
    getMe: () => this.get('/auth/me'),
    updateProfile: (userData) => this.put('/auth/profile', userData),
    changePassword: (passwordData) => this.put('/auth/change-password', passwordData),
    logout: () => this.post('/auth/logout')
  };

  // Products API methods
  products = {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.get(`/products${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => this.get(`/products/${id}`),
    create: (productData) => this.post('/products', productData),
    update: (id, productData) => this.put(`/products/${id}`, productData),
    delete: (id) => this.delete(`/products/${id}`),
    addReview: (id, reviewData) => this.post(`/products/${id}/reviews`, reviewData),
    getCategories: () => this.get('/products/categories'),
    getFeatured: () => this.get('/products/featured'),
    search: (query, params = {}) => {
      const searchParams = new URLSearchParams({ q: query, ...params });
      return this.get(`/products/search?${searchParams}`);
    }
  };

  // Cart API methods
  cart = {
    get: () => this.get('/cart'),
    addItem: (productId, quantity = 1) => this.post('/cart/add', { productId, quantity }),
    updateItem: (productId, quantity) => this.put(`/cart/item/${productId}`, { quantity }),
    removeItem: (productId) => this.delete(`/cart/item/${productId}`),
    clear: () => this.delete('/cart/clear'),
    getCount: () => this.get('/cart/count')
  };

  // Orders API methods
  orders = {
    create: (orderData) => this.post('/orders', orderData),
    getMyOrders: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.get(`/orders/my-orders${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => this.get(`/orders/${id}`),
    cancel: (id) => this.put(`/orders/${id}/cancel`),
    // Admin methods
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.get(`/orders/admin/all${queryString ? `?${queryString}` : ''}`);
    },
    updateStatus: (id, statusData) => this.put(`/orders/admin/${id}/status`, statusData),
    getStats: () => this.get('/orders/admin/stats')
  };

  // Users API methods (Admin only)
  users = {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.get(`/users${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => this.get(`/users/${id}`),
    update: (id, userData) => this.put(`/users/${id}`, userData),
    delete: (id) => this.delete(`/users/${id}`),
    getStats: () => this.get('/users/stats/overview')
  };
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
