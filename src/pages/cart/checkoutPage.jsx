import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import '../css/cart/checkout.css';

function CheckoutPage() {
    const { user, cart, itemCount, cartTotal, clearCart } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        paymentMethod: 'Google Pay'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            userId: user._id,
            cartItems: cart,
            shippingAddress: {
                fullName: formData.fullName,
                address: formData.address
            },
            paymentMethod: formData.paymentMethod
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const newOrder = await response.json();
                clearCart();
                navigate(`/order-success/${newOrder._id}`);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <main className="container-ch">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Checkout</h1>
                <p className="text-gray-500 mt-2">
                    <Link to="/">Home</Link> /
                    <Link to="/cart">Shopping Cart</Link> /
                    <span className="text-gray-400">Checkout</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                    <div className="left-column">
                        <div className="card-box">
                            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                            <div className="form-grid">
                                <div className="grid-col-span-2">
                                    <label htmlFor="full-name" className="form-label">Full Name</label>
                                    <input type="text" id="full-name" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" required />
                                </div>
                                <div className="grid-col-span-2">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-input" required />
                                </div>
                                <div>
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="form-input" required />
                                </div>
                                <div>
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="form-input" required />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="form-label">ZIP Code</label>
                                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className="form-input" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" required />
                                </div>
                            </div>
                        </div>

                        <div className="card-box">
                            <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                            <div className="space-y-4">
                                <div className="payment-method">
                                    <input type="radio" name="paymentMethod" id="gpay" value="Google Pay" checked={formData.paymentMethod === 'Google Pay'} onChange={handleChange} />
                                    <label htmlFor="gpay"><span>Google Pay</span></label>
                                </div>
                                <div className="payment-method">
                                    <input type="radio" name="paymentMethod" id="cod" value="Cash On Delivery" checked={formData.paymentMethod === 'Cash On Delivery'} onChange={handleChange} />
                                    <label htmlFor="cod"><span>Cash On Delivery</span></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card-box sticky-summary">
                            <h2 className="text-xl font-semibold border-b mb-4">Order Summary</h2>
                            <div className="space-y-3 text-gray-500">
                                <div className="summary-item">
                                    <span>Items:</span>
                                    <span>{itemCount}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Sub Total:</span>
                                    <span>{cartTotal.toFixed(2)} Rs.</span>
                                </div>
                                <div className="border-t mt-4 summary-item total-summary">
                                    <span>Total</span>
                                    <span className="text-green-600">{cartTotal.toFixed(2)} Rs.</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="btn-primary">Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default CheckoutPage;