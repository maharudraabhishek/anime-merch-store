import axios from 'axios';

// Create an axios instance with a base URL.  During development the
// frontend and backend both run on the same host (localhost) but
// different ports.  Change the port if you modify the Express server.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const registerUser = async (user) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};
