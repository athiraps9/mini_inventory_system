import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

export const productApi = {
  getProducts: (page = 1, limit = 10, search = '') => 
    api.get(`/products?page=${page}&limit=${limit}&search=${search}`),
  
  getProduct: (id) => 
    api.get(`/products/${id}`),
  
  getStats: () => 
    api.get('/products/stats'),
  
  createProduct: (data) => 
    api.post('/products', data),
  
  updateProduct: (id, data) => 
    api.put(`/products/${id}`, data),
  
  deleteProduct: (id) => 
    api.delete(`/products/${id}`),
};

export default api;
