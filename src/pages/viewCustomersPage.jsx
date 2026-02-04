import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/viewCustomersPage.css'; // You can create this file for styling

function ViewCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Fetching from the new endpoint we just created
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
                if (!response.ok) throw new Error('Failed to fetch customers');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    if (loading) return <div>Loading customers...</div>;

    return (
        <div className="page-container">
            <h1>Customer Management</h1>

            <div className="data-section">
                <h3>All Registered Customers</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map(customer => (
                                <tr key={customer._id}>
                                    <td data-label="Customer ID">{customer._id.slice(-6)}</td>
                                    <td data-label="Name">{customer.name}</td>
                                    <td data-label="Email">{customer.email}</td>
                                    <td data-label="Action">
                                        {/* This link will eventually go to a customer detail page */}
                                        <Link to={`/admin/customers/${customer._id}`} className="action-btn">View History</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No customers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCustomersPage;