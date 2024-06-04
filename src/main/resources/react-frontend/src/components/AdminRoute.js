// src/components/AdminRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminRoute.css';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : isAuthenticated ? (
          <div className='admin-only'>Unauthorized Access, Administrator only!</div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
