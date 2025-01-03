import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './CrudApp.css';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// POST request to add a new user (name, email, password)
export const addUser = async (userData) => {
  try {
    const response = await api.post('/api/auth', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// GET request to fetch all users
export const getUsers = async () => {
  try {
    const response = await api.get('/api/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// PUT request to update a user's name, email, and password
export const updateUser = async (originalEmail, updatedData) => {
  try {
    const response = await api.put('/api/update', { originalEmail, ...updatedData });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// DELETE request to delete a user by email
export const deleteUser = async (email) => {
  try {
    const response = await api.delete('/api/delete', { data: { email } });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const CrudApp = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      setUsers(result);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      if (newUser.name && newUser.email && newUser.password) {
        await addUser(newUser);
        fetchUsers();
        setNewUser({ name: '', email: '', password: '' });
      } else {
        alert('Please fill all fields.');
      }
    } catch (error) {
      alert('Failed to add user.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user, originalEmail: user.email });
  };

  const handleUpdateUser = async () => {
    try {
      if (editingUser) {
        const { originalEmail, ...updatedData } = editingUser;
        await updateUser(originalEmail, updatedData);
        fetchUsers();
        setEditingUser(null);
      }
    } catch (error) {
      alert('Failed to update user.');
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      await deleteUser(email);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user.');
    }
  };

  // Login Handler
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const response = await api.post('/api/login', { email: loginEmail, password: loginPassword });

      if (response.data.success) {
        alert('Login successful!');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>

      {/* Login Section */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      {/* Add New User Section */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Edit User Section */}
      {editingUser && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={editingUser.password}
            onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {/* Users List */}
      <ul>
        {users.map((user) => (
          <li key={user.email} style={{ marginBottom: '10px' }}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleEditUser(user)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDeleteUser(user.email)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApp;
