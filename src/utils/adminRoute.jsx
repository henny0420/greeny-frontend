import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function AdminRoute() {
    const { user, isLoggedIn } = useAuth();

    // 1. Check if the user is logged in AND their role is 'admin'.
    if (isLoggedIn && user?.role === 'admin') {
        // 2. If they are an admin, show the page they were trying to access.
        return <Outlet />;
    } else {
        // 3. If not, redirect them to the login page.
        return <Navigate to="/login" />;
    }
}

export default AdminRoute;