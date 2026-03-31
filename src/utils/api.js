// In development, Vite proxy handles /api → localhost:5000
// In production, we use the full backend URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = (path) => `${API_BASE}${path}`;

export const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('gym_jwt_token')}`,
});

export const jsonAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('gym_jwt_token')}`,
});
