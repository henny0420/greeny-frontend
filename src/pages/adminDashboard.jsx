import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/adminDashboard.css';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                setError('Failed to fetch dashboard data.');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="admin-main-content">
            <div className="dashboard-container">
                <h1>Dashboard</h1>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>Total Revenue</h4>
                        <p>{stats.todayRevenue.toFixed(2)} Rs.</p>
                    </div>
                    <div className="stat-card">
                        <h4>Today's Orders</h4>
                        <p>{stats.todayOrders}</p>
                    </div>
                    <div className="stat-card">
                        <h4>Pending Orders</h4>
                        <p>{stats.pendingOrders}</p>
                    </div>
                    <div className="stat-card">
                        <h4>Total Products</h4>
                        <p>{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="data-section">
                    <h3>Recent Orders</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>#{order._id.slice(-6)}</td>
                                        <td>{order.user?.name || 'N/A'}</td>
                                        <td>{order.total_amount.toFixed(2)} Rs.</td>
                                        <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                        <td><Link to={`/admin/orders/${order._id}`} className="action-btn">View</Link></td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No recent orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default AdminDashboard;