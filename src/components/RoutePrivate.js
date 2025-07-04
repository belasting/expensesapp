import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoutePrivate = ({ children, ...props }) => {
  const { user } = useAuth();

  if (user) {
    return children
  } else {
    return (
      <Navigate replace to="/login" />
    );
  }

}

export default RoutePrivate