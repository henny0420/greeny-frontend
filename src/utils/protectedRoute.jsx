import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function ProtectedRoute() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Outlet />; // If logged in, show the page they want
    } else {
        return <Navigate to="/login" replace />; // If not, redirect to login
    }
}

export default ProtectedRoute;