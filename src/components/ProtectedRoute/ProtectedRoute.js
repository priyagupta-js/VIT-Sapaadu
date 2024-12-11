import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
        // Redirect to login page if no token is found
        return <Navigate to="/signup" />;
    }

    // Optionally, verify token expiration here
    const isTokenExpired = false; // Logic to check token expiration
    if (isTokenExpired) {
        localStorage.removeItem('token');
        return <Navigate to="/signup" />;
    }

    return children; // Render the children (the protected component)
};

export default ProtectedRoute;
