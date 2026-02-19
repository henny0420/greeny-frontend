import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function AdminRoute() {
    const { user, isLoggedIn } = useAuth();

    if (isLoggedIn && user?.role === 'admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default AdminRoute;