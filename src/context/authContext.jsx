import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // --- User Auth State ---
    const [user, setUser] = useState(null);

    // --- Cart State ---
    const [cart, setCart] = useState([]);

    // On initial load, check localStorage for user data and cart data
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

    // Function to handle login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Function to handle logout
    const logout = () => {
        setUser(null);
        setCart([]); // Clear cart on logout
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };

    // --- Cart Functions ---
    // --- Cart Functions ---
    const addToCart = (product, quantity = 1) => { // Now accepts a quantity
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            let newCart;
            if (existingProduct) {
                // If it exists, increase the quantity by the amount provided
                newCart = prevCart.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // If it's a new product, add it with the specified quantity
                newCart = [...prevCart, { ...product, quantity: quantity }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
        // Optional: give the user some feedback
        alert(`${quantity} x ${product.name} added to cart!`);
    };
    
    // We will add removeFromCart, updateQuantity etc. later

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
        cart,
        addToCart,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};