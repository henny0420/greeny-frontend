import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import '../css/cart/cart.css';

function CartPage() {
    const { cart, removeFromCart, updateQuantity, itemCount, cartTotal } = useAuth();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Shopping Cart</h1>
                </div>
            </div>

            <main className="container cart-main">
                {cart.length > 0 ? (
                    <div className="cart-layout">
                        <div className="cart-table-container">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item._id}>
                                            <td className="product-cell">
                                                <button onClick={() => removeFromCart(item._id)} className="remove-item">&times;</button>
                                                <img src={item.imageUrl} alt={item.name} />
                                                <span>{item.name}</span>
                                            </td>
                                            <td>{(item.final_price || item.price).toFixed(2)} Rs.</td>
                                            <td>
                                                <div className="quantity-selector">
                                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                                    <div className="counter">{item.quantity}</div>
                                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="subtotal-cell">{((item.final_price || item.price) * item.quantity).toFixed(2)} Rs.</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <ul>
                                <li><span>Items</span> <span>{itemCount}</span></li>
                                <li><span>Sub Total</span> <span>{cartTotal.toFixed(2)} Rs.</span></li>
                                <li><span>Shipping</span> <span>0.00 Rs.</span></li>
                                <li><span>Taxes</span> <span>0.00 Rs.</span></li>
                            </ul>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{cartTotal.toFixed(2)} Rs.</span>
                            </div>
                            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
                        </div>
                    </div>
                ) : (
                    <p className="empty-cart-message">Your cart is empty. <Link to="/shop">Start shopping!</Link></p>
                )}
            </main>
        </>
    );
}

export default CartPage;