import React from 'react';
import { useParams, Link } from 'react-router-dom';

import '../css/cart/orderSuccessPage.css'; 

function OrderSuccessPage() {
    const { orderId } = useParams(); 

    return (
        <main className="container">
            <div className="success-container">
                <div className="success-icon">&#10004;</div>
                <h1>Thank You For Your Order!</h1>
                <p>Your order has been placed successfully.</p>
                <p>Your Order Number is: <strong>#{orderId.slice(-6)}</strong></p>
                <Link to="/shop" className="continue-shopping-btn">Continue Shopping</Link>
            </div>
        </main>
    );
}

export default OrderSuccessPage;