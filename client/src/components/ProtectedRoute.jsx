import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(UserContext);

  if (!isUserLoggedIn) {
    // Navigate to login if user is not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the children components if user is logged in
  return children;
};

export default ProtectedRoute;
