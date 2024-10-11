import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { role } = useSelector((state) => state.auth);
    
    return role === 'superuser' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
