// Centralized API service
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : '/api'; // Use proxy in development

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🔍 API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Data:', data);

      return data;
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  static async getFlavors() {
    return this.request('/flavors');
  }

  static async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  static async testConnection() {
    return this.request('/test');
  }

  static async getHealth() {
    return this.request('/health');
  }
}

export default ApiService;
