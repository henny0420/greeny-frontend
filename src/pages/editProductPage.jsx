import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/editProductPage.css';

function EditProductPage() {
    // useParams gets the ':id' from the URL
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // 1. Fetch the existing product data when the component loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]); // This effect runs whenever the 'id' from the URL changes

    // 2. Handle changes in the form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 3. Handle the form submission to update the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                setMessage('Product updated successfully!');
                setTimeout(() => {
                    navigate('/admin/products'); // Redirect back to the product list
                }, 1500);
            } else {
                setMessage('Failed to update product.');
            }
        } catch (error) {
            setMessage('Error connecting to the server.');
        }
    };

    if (loading) return <div>Loading product...</div>;
    if (!product) return <div>{message || 'Product not found.'}</div>;

    // The JSX is a direct conversion of your HTML form
    return (
        <div className="form-container">
            <h2>Edit Product</h2>
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                {/* The form inputs are pre-filled with the 'product' state */}
                <label htmlFor="name">Product Name:</label>
                <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />

                <label htmlFor="price">Regular Price:</label>
                <input type="number" id="price" name="price" step="0.01" value={product.price} onChange={handleChange} required />
                
                {/* Note: In a real app, you'd add all the other fields here too (description, category, etc.) */}
                {/* For this example, we'll just keep it to these fields. */}
                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
                
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={product.category} onChange={handleChange} required />

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditProductPage;