
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/viewOrdersPage.css'; // You can create this file for styling

function ViewOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Helper to format date nicely
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <main className="admin-main-content">   
        <div className="admin-container">
            <h1>Order Management</h1>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id.slice(-6)}</td>
                                <td>{order.user?.name || 'N/A'}</td>
                                <td>{formatDate(order.order_date)}</td>
                                <td>{order.total_amount.toFixed(2)} Rs.</td>
                                <td>{order.status}</td>
                                <td className="action-links">
                                    {/* This links to the Order Details page we already built */}
                                    <Link to={`/admin/orders/${order._id}`} className="edit">View Details</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No orders found yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </main>
    );
}

export default ViewOrdersPage;