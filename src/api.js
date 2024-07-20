import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchPasswords = () => API.get('/passwords');
export const createPassword = (newPassword) => API.post('/passwords', newPassword);
export const updatePassword = (id, updatedPassword) => API.patch(`/passwords/${id}`, updatedPassword);
export const deletePassword = (id) => API.delete(`/passwords/${id}`);

