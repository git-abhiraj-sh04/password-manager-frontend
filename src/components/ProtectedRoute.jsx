import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in sessionStorage

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
