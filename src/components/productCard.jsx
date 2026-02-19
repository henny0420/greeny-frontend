import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './productCard.css'; 

function ProductCard({ product, type = 'simple' }) {
    const { addToCart } = useAuth();
    const [quantity, setQuantity] = useState(1);


    if (type === 'detailed') {
        return (
            <div className="about-product">
                <div className="image-prod">
                    <Link to={`/product/${product._id}`}>
                        <img src={product.imageUrl} alt={product.name} />
                    </Link>
                </div>
                <span className="sp1">{product.category?.name || 'General'}</span>
                <h5><Link to={`/product/${product._id}`}>{product.name}</Link></h5>
                <div className="rating">
                    <svg className="rating-star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <span className="s2">({product.rating || 0})</span>
                </div>
                {product.discount_percentage > 0 &&
                    <div className="image coupon-banner">
                        <img src="/assets/images/coupan.jpg" alt="Coupon" />
                        <div className="text">
                            <span className="text-span">Digital coupon: {product.discount_percentage}% OFF</span>
                        </div>
                    </div>
                }
                <div className="price">
                    <h5>Final price:</h5>
                    <h3>{(product.final_price || product.price).toFixed(2)} Rs.</h3>
                </div>
                <div className="button-group-alignment">
                    <div className="button-group">
                        <div className="action-button minus-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</div>
                        <div className="counter">{quantity}</div>
                        <div className="action-button plus-btn" onClick={() => setQuantity(q => q + 1)}>+</div>
                    </div>
                    <div className="add-to-cart">
                        <button type="button" onClick={() => addToCart(product, quantity)}>
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (type === 'featured') {
        return (
            <div className="product-card featured-card">
                {product.final_price < product.price && <div className="sale-badge">Sale!</div>}
                <div className="product-image-container">
                    <Link to={`/product/${product._id}`}><img src={product.imageUrl} alt={product.name} /></Link>
                </div>
                <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                <p className="price">
                    {product.final_price < product.price && (
                        <span className="original-price">{product.price.toFixed(2)} Rs.</span>
                    )}
                    {(product.final_price || product.price).toFixed(2)} Rs.
                </p>
                <button className="add-to-cart-btn btn-add" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
        );
    }

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                <img src={product.imageUrl} alt={product.name} />
            </Link>
            <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
            <p className="price">{(product.final_price || product.price).toFixed(2)} Rs.</p>
        </div>
    );
}

export default ProductCard;