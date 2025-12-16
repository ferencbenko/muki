import axios from 'axios';
import { ApiResponse, Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const productService = {
  /**
   * Get all products
   */
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/api/products');
    return response.data.data || [];
  },

  /**
   * Get product by ID
   */
  async getById(id: number): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
    if (!response.data.data) {
      throw new Error('Product not found');
    }
    return response.data.data;
  },

  /**
   * Get products with pagination
   */
  async getWithPagination(page: number = 1, limit: number = 10): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/api/products', {
      params: { page, limit },
    });
    return response.data.data || [];
  },
};

export default apiClient;
