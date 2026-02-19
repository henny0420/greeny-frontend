import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function ProtectedRoute() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Outlet />; 
    } else {
        return <Navigate to="/login" replace />; 
    }
}

export default ProtectedRoute;