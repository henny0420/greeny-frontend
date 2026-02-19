

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setCart([]); // Clear cart on logout
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };


    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);
            let newCart;
            if (existingItem) {
                newCart = prevCart.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                newCart = [...prevCart, { ...product, quantity }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };
    
    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(item => item._id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) { 
            removeFromCart(productId);
            return;
        }
        setCart(prevCart => {
            const newCart = prevCart.map(item => 
                item._id === productId ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.final_price || item.price) * item.quantity, 0);

    const value = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        cart,
        itemCount,
        cartTotal,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }), [user, cart]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};