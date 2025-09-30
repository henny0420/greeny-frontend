// src/utils/adminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/adminHeader';

function AdminLayout() {
    return (
        <div className="admin-container">
            <AdminHeader />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;