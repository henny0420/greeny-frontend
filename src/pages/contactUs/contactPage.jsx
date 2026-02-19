import React, { useState } from 'react';

import '../css/contactUs/contactUs.css'; 

const contactInfo = [
    { type: 'Phone', value: '+91 (123) 456-7890', href: 'tel:+911234567890', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
    { type: 'Email', value: 'contact@greeny.com', href: 'mailto:contact@greeny.com', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { type: 'Address', value: <>123 Grocery Lane, Adajan,<br />Surat, Gujarat 395009</>, href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
];

function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [error, setError] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        
        console.log("Form data submitted:", formData);
        setIsSent(true);
    };

    return (
        <div className="container-contact">
            <div className="contact-card">
                <div className="title-section">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you! Drop us a line below.</p>
                </div>
                <div className="content-grid">
                    <div className="form-column">
                        <h2>Send us a Message</h2>
                        
                        {isSent ? (
                            <div className="success-message">
                                Thank you for your message! We'll get back to you shortly.
                            </div>
                        ) : (
                            <>
                                {error && <div className="error-message">{error}</div>}
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name *</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ex. John Doe" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email *</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter Subject" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Your Message *</label>
                                        <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Enter here..." required></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="submit-btn">Send Message</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                    <div className="info-column">
                        <h2>Get in Touch!</h2>
                        <p>Find us at our store or contact us directly. We're here to help with all your grocery needs.</p>
                        <ul className="info-list">
                            {contactInfo.map(item => (
                                <li key={item.type}>
                                    <div className="info-icon">{item.icon}</div>
                                    <div className="info-details">
                                        <h3>{item.type}</h3>
                                        {item.href === '#' ? <p>{item.value}</p> : <a href={item.href}>{item.value}</a>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="map-section">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.32939989895!2d72.73983802115162!3d21.15914250314032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1694937747867!5m2!1sen!2sin" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
}

export default ContactPage;