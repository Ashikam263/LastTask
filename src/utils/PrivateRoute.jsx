// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
