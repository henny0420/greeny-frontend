import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

// Import the CSS for this page
import '../css/account/account.css';

function AccountPage() {
    const { user, logout } = useAuth(); // Get user and logout function from context
    const navigate = useNavigate();

    // State to manage which tab is active
    const [activePage, setActivePage] = useState('profile');

    // State to hold user's data and orders
    const [name, setName] = useState(user?.name || '');
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch the user's order history when the 'orders' tab is clicked
    useEffect(() => {
        // This check ensures 'user' is not null before trying to read 'user._id'
        if (activePage === 'orders' && user) {
            const fetchOrders = async () => {
                try {
                    // We'll need a new backend endpoint for this
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders/${user._id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                }
            };
            fetchOrders();
        }
    }, [activePage, user]);

    // Handle profile update
    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // In a real app, you'd send this to a backend endpoint:
        // fetch(`/api/users/update/${user._id}`, { method: 'PUT', ... })
        setMessage('<div class="success-message">Profile updated successfully!</div>');
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <main className="container-account">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Account</h1>
                <p className="text-gray-500">Manage your profile, orders, and addresses.</p>
            </div>

            <div className="account-layout">
                <aside>
                    <nav className="sidebar-nav">
                        <ul>
                            {/* We use onClick to change the activePage state */}
                            <li><a onClick={() => setActivePage('profile')} className={activePage === 'profile' ? 'active' : ''}><i className="fas fa-user-circle"></i> My Profile</a></li>
                            <li><a onClick={() => setActivePage('orders')} className={activePage === 'orders' ? 'active' : ''}><i className="fas fa-box"></i> Order History</a></li>
                            <li><a onClick={() => setActivePage('addresses')} className={activePage === 'addresses' ? 'active' : ''}><i className="fas fa-map-marker-alt"></i> Saved Addresses</a></li>
                            <li><a onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                        </ul>
                    </nav>
                </aside>

                <section>
                    {/* The Profile Section */}
                    <div id="profile" className="content-box" style={{ display: activePage === 'profile' ? 'block' : 'none' }}>
                        <h2 className="text-xl font-semibold mb-6">My Profile</h2>
                        {/* We use dangerouslySetInnerHTML to render the message HTML */}
                        {message && <div dangerouslySetInnerHTML={{ __html: message }} />}
                        <form onSubmit={handleProfileUpdate}>
                            <div className="form-grid-2">
                                <div>
                                    <label htmlFor="full-name" className="form-label">Full Name</label>
                                    <input type="text" id="full-name" name="full-name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" id="email" className="form-input" value={user?.email || ''} readOnly style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button type="submit" name="update_profile" className="btn">Save Changes</button>
                            </div>
                        </form>
                    </div>

                    {/* The Orders Section */}
                    <div id="orders" className="content-box" style={{ display: activePage === 'orders' ? 'block' : 'none' }}>
                        <h2 className="text-xl font-semibold mb-6">Order History</h2>
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? orders.map(order => (
                                    <tr key={order._id}>
                                        <td>#{order._id.slice(-6)}</td>
                                        <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                        <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                        <td>{order.total_amount.toFixed(2)} Rs.</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>You have no past orders.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* The Addresses Section */}
                    <div id="addresses" className="content-box" style={{ display: activePage === 'addresses' ? 'block' : 'none' }}>
                        <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
                        <p>You have no saved addresses.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default AccountPage;