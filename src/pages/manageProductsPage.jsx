import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/manageProductsPage.css'; // You can create this file for styling

function ManageProductsPage() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    // Function to fetch all products
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            if (response.ok) {
                setProducts(data);
            }
        } catch (error) {
            setMessage('Failed to fetch products.');
        }
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to handle deleting a product
    const handleDelete = async (productId) => {
        // Show a confirmation dialog before deleting
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMessage('Product deleted successfully!');
                    // Refresh the product list after deletion
                    fetchProducts();
                } else {
                    setMessage('Failed to delete product.');
                }
            } catch (error) {
                setMessage('Error connecting to the server.');
            }
        }
    };

    return (
        <main className="admin-main-content">
        <div className="admin-container">
            <h1>Product Management</h1>
            <Link to="/admin/add-product" className="add-new-btn">Add New Product</Link>
            
            {message && <p>{message}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Final Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id.slice(-6)}</td>
                                <td>{product.name}</td>
                                <td>{(product.final_price || product.price).toFixed(2)} Rs.</td>
                                <td className="action-links">
                                    {/* Link to the edit page which we will create next */}
                                    <Link to={`/admin/edit-product/${product._id}`} className="edit">Edit</Link>
                                    <button onClick={() => handleDelete(product._id)} className="delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </main>
    );
}

export default ManageProductsPage;