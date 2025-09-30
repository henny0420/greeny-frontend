import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
// You will create this CSS file later to match your old project's styles
import './adminHeader.css'; 

function AdminHeader() {
    // Get user data and the logout function from our global AuthContext
    const { user, logout } = useAuth();

    return (
        <header className="admin-header">
            <div className="header-content">
                <div className="logo-area">
                    {/* Link to the main dashboard page */}
                    <Link to="/admin/dashboard"><h3>Admin Panel</h3></Link>
                </div>
                <nav className="admin-nav">
                    {/* We use NavLink here because it can show an 'active' state */}
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink to="/admin/products">Products</NavLink>
                    <NavLink to="/admin/orders">Orders</NavLink>
                    <NavLink to="/admin/customers">Customers</NavLink>
                </nav>
                <div className="user-area">
                    {/* Display the logged-in admin's name */}
                    <span>Welcome, {user?.name}</span>
                    <Link to="/" className="view-site-btn">View Site</Link>
                    {/* The logout button now calls the logout function from our context */}
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;