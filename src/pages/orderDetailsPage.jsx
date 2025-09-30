import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/orderDetailsPage.css'; // You can create this for custom styles

function OrderDetailsPage() {
    const { id } = useParams(); // Get the order ID from the URL
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`);
                if (!response.ok) throw new Error('Order not found');
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) return <div>Loading order details...</div>;
    if (!order) return <div>Order not found.</div>;

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <main className="admin-main-content">
            <div className="order-details-container">
                <Link to="/admin/orders" className="back-link">&larr; Back to All Orders</Link>
                <h1>Order Details: #{order._id.slice(-6)}</h1>

                <div className="info-grid">
                    <div className="info-card customer-info">
                        <h2>Customer Information</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        {/* We will add address to the order model later */}
                        <p><strong>Shipping Address:</strong><br />123 Greeny Lane, Foodville</p>
                    </div>

                    <div className="info-card order-summary">
                        <h2>Order Summary</h2>
                        <p><strong>Order Date:</strong> {formatDate(order.order_date)}</p>
                        <p><strong>Order Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                        <p><strong>Order Total:</strong> <strong>{order.total_amount.toFixed(2)} Rs.</strong></p>
                    </div>
                </div>

                <div className="items-section">
                    <h2>Items in this Order</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Item</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items?.map(item => (
                                <tr key={item._id}>
                                    <td>{item.product?.name || 'Product not found'}</td>
                                    <td>{item.quantity}</td>
                                    {/* We will add price_at_time_of_purchase later */}
                                    <td>{(item.product?.price || 0).toFixed(2)} Rs.</td>
                                    <td>{(item.quantity * (item.product?.price || 0)).toFixed(2)} Rs.</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default OrderDetailsPage;