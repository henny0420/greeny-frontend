import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './adminHeader.css'; 

function AdminHeader() {
    const { user, logout } = useAuth();

    return (
        <header className="admin-header">
            <div className="header-content">
                <div className="logo-area">
                    <Link to="/admin/dashboard"><h3>Admin Panel</h3></Link>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink to="/admin/products">Products</NavLink>
                    <NavLink to="/admin/orders">Orders</NavLink>
                    <NavLink to="/admin/customers">Customers</NavLink>
                </nav>
                <div className="user-area">
                    <span>Welcome, {user?.name}</span>
                    <Link to="/" className="view-site-btn">View Site</Link>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;