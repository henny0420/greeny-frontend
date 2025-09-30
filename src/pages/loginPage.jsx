import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // 1. Import useAuth

// You can create a login.css file and import it here if you have specific styles
// import './css/login.css'; 

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // 2. Get the login function from our context

    // This is the single, correct handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // 3. Save the user data to our global context!
                login(data); 

                // Redirect based on role
                if (data.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setErrorMessage(data.msg || 'Login failed.');
            }
        } catch (err) {
            setErrorMessage('Could not connect to the server.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="container-register">
            <h2>Log In</h2>
            
            {errorMessage && (
                <div className="message-box">
                    <p>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-product-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="submit-btn">Log In</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Sign Up here</Link>.
            </p>
        </div>
    );
}

export default LoginPage;