import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './features/shared/components/Loader';
import { has } from 'lodash';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useSelector((store) => store.auth);
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  
  if (isLoading) return <Loader />;

  if (!isLoading && (!user)) {
    <Navigate to="/login" />
  }
  else{

    const userRole = user.role.name;
    const hasAccess = allowedRoles.some((role) => role === userRole);

    if (!hasAccess) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
