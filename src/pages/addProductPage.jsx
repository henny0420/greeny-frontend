import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/addProductPage.css';

function AddProductPage() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        imageUrl: '',
        category: '',
        price: 0,
        rating: 0,
        is_featured: false,
        is_popular: false,
        is_premium: false,
        discount_percentage: 0,
        offer_tag: ''
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                const data = await response.json();
                setCategories(data);
                // Set a default selected category if they exist
                if (data.length > 0) {
                    setProduct(prevState => ({ ...prevState, category: data[0]._id }));
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []); // The empty array ensures this runs only once

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                setMessage('New product added successfully!');
                setTimeout(() => {
                    navigate('/admin/products');
                }, 1500);
            } else {
                const errorData = await response.json();
                setMessage(errorData.msg || 'Failed to add product.');
            }
        } catch (error) {
            setMessage('Error connecting to the server.');
        }
    };

    return (
        <main className="admin-main-content">
            <div className="container-add_product">
                <h2>Add New Product</h2>

                {message && (
                    <div className="message-box">
                        <p>{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="add-product-form">
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange} required></textarea>

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="e.g., /assets/images/apple.jpg" required />

                    {/* <label htmlFor="category">Category:</label> */}
                    {/* For now a text input, we will make this a dropdown fetched from the DB later */}
                    {/* <input type="text" id="category" name="category" value={product.category} onChange={handleChange} required /> */}
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={product.category} onChange={handleChange} required>
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <label htmlFor="price">Regular Price:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} step="0.01" required />

                    <label htmlFor="rating">Rating (1-5):</label>
                    <input type="number" id="rating" name="rating" value={product.rating} onChange={handleChange} step="0.1" min="0" max="5" />

                    <hr />
                    <h3>Promotional Tags</h3>

                    <div className="checkbox-group">
                        <input type="checkbox" id="is_featured" name="is_featured" checked={product.is_featured} onChange={handleChange} />
                        <label htmlFor="featured">Featured Product</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="is_popular" name="is_popular" checked={product.is_popular} onChange={handleChange} />
                        <label htmlFor="popular">Popular Product</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="is_premium" name="is_premium" checked={product.is_premium} onChange={handleChange} />
                        <label htmlFor="premium">Premium Product</label>
                    </div>

                    <label htmlFor="discount_percentage">Discount Percentage:</label>
                    <input type="number" id="discount_percentage" name="discount_percentage" value={product.discount_percentage} onChange={handleChange} placeholder="e.g., 20 for 20% OFF" />

                    <label htmlFor="offer_tag">Offer Tag:</label>
                    <input type="text" id="offer_tag" name="offer_tag" value={product.offer_tag} onChange={handleChange} placeholder="e.g., Deal of the Day" />

                    <button type="submit" className="submit-btn">Add Product</button>
                </form>
            </div>
        </main>
    );
}

export default AddProductPage;