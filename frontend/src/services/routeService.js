import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
});

export const calculateRoute = async (selectedPoints, filters) => {
  const response = await api.post('/zones/calculate/', {
    points: selectedPoints,
    filters,
  });
  return response.data;
};