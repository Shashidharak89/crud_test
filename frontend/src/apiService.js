import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// POST request to add a new user (name, email, password)
export const addUser = async (userData) => {
  const response = await api.post('/api/auth', userData);
  return response.data;
};

// GET request to fetch all users
export const getUsers = async () => {
  const response = await api.get('/api/items');
  return response.data;
};

// PUT request to update a user's name, email, and password
export const updateUser = async (updatedData) => {
  const response = await api.put('/api/update', updatedData);
  return response.data;
};

// DELETE request to delete a user by email
export const deleteUser = async (email) => {
  const response = await api.delete('/api/delete', { data: { email } });
  return response.data;
};
