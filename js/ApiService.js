// ApiService.js
export class ApiService {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async request(endpoint, method = 'GET', data = null, headers = {}) {
    const config = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
    };

    if (data) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сети');
      }
      return await response.json();
    } catch (error) {
      console.error(`Ошибка при выполнении запроса: ${error.message}`);
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  post(endpoint, data, headers = {}) {
    return this.request(endpoint, 'POST', data, headers);
  }

  put(endpoint, data, headers = {}) {
    return this.request(endpoint, 'PUT', data, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }
}
