import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

const PrivateRoute = ({ path, element }) => {
    const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default PrivateRoute;
