import React from 'react';
import { Link } from 'react-router-dom';
import '../css/shop/shopBanner.css';
// We will create this CSS file next
// import './shopBanner.css'; 

function ShopBanner() {
    return (
        <div className="herobanner-products">
            {/* Make sure this image is in your public/assets/images/ folder */}
            <img src="/assets/images/hbanner-2.webp" alt="herobanner" />

            <div className="hbanner-for-products-text">
                <h4>Your One-Stop</h4>
                <h5>Shop For Quality Groceries</h5>
                <p>Free shipping on all your order. we deliver, you enjoy</p>
                <Link to="/shop">
                    <button>ORDER NOW</button>
                </Link>
            </div>
        </div>
    );
}

export default ShopBanner;