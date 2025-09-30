import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// You can create a register.css file and import it here
import './css/register.css'; 

function Register() {
    // These states replace the PHP variables $name, $email, $password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // This state replaces the PHP $message variable
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // This function replaces all the logic in your PHP `if ($_SERVER["REQUEST_METHOD"] == "POST")` block
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }), // We send the name here
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful! You can now log in.');
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            } else {
                setMessage(data.msg || 'Registration failed.');
            }
        } catch (err) {
            setMessage('Could not connect to the server.');
        }
    };

    return (
        // This JSX is a direct conversion of your HTML body
        <div className="container-register">
            <h2>Sign Up</h2>
            
            {/* This replaces your `if (!empty($message))` block */}
            {message && (
                <div className="message-box">
                    <p>{message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-product-form">
                {/* !!!!! HERE IS THE NAME INPUT !!!!! */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <button type="submit" className="submit-btn">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Already have an account? <Link to="/login">Log In here</Link>.
            </p>
        </div>
    );
}

export default Register;