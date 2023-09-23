import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (!isAuthenticated) {
    alert('You need to log in to access this page.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
