import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// Import the CSS for this page
import './css/ProductDetailPage.css'; 

function ProductDetailPage() {
    // useParams gets the dynamic part of the URL (the ID)
    const { productId } = useParams(); 
    const { addToCart } = useAuth();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]); // Re-run this effect if the productId in the URL changes

    if (loading) return <div className="container"><h2>Loading...</h2></div>;
    if (error) return <div className="container"><h2>{error}</h2></div>;
    if (!product) return <div className="container"><h2>Product not found.</h2></div>;

    return (
        <main className="container-product-details">
            <div className="product-container">
                {/* Product Image Section */}
                <div className="product-image-section">
                    <div className="product-image">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                </div>

                {/* Product Information Section */}
                <div className="product-info-section">
                    <div className="product-header">
                        <span className="category-tag">{product.category?.name || 'General'}</span>
                        <div className="rating">
                            <svg className="rating-star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <span className="rating-text">{product.rating}</span>
                        </div>
                    </div>

                    <h1 className="product-name">{product.name}</h1>
                    
                    {product.description && <p className="product-description">{product.description}</p>}

                    <div className="pricing-section">
                        {product.discount_percentage > 0 && (
                            <div className="regular-price-container">
                                <span className="price-label">Regular Price:</span>
                                <span className="regular-price">{product.price.toFixed(2)} Rs.</span>
                            </div>
                        )}
                        {product.discount_percentage > 0 && (
                            <div className="coupon-banner">
                                <p className="coupon-text">Digital Coupon Applied! {product.discount_percentage}% OFF</p>
                            </div>
                        )}
                        <div className="final-price-container">
                            <span className="price-label final">Final Price:</span>
                            <span className="final-price">{(product.final_price || product.price).toFixed(2)} Rs.</span>
                            <span className="price-unit"> / each</span>
                        </div>
                    </div>

                    <div className="add-to-cart-container">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="quantity-btn">-</button>
                            <input type="text" value={quantity} className="quantity-input" readOnly />
                            <button onClick={() => setQuantity(q => q + 1)} className="quantity-btn">+</button>
                        </div>
                        
                        <button className="add-to-cart-btn" onClick={() => addToCart(product, quantity)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetailPage;