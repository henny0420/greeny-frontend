import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

const facilityData = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-9h9.563c.621 0 1.125.504 1.125 1.125v4.5m-10.688 0H18.375m-17.25 0h.008v.008h-.008v-.008z" /></svg>, title: 'Free Shipping', text: 'For all orders above 100 Rs.', className: 'delivery' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-11.667 0l3.181-3.183a8.25 8.25 0 00-11.667 0l3.181 3.183z" /></svg>, title: 'Easy Return Policy', text: 'Within 7 days', className: 'returns' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>, title: '100% Secure Payment', text: 'Guarantee secure payment', className: 'payment' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, title: '24/7 Dedicated Support', text: 'Anywhere & anytime', className: 'support' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>, title: 'Daily Offer', text: 'Discount up to 50% off', className: 'offers' }
];

const footerLinks = {
    'My Account': [
        { name: 'Profile', path: '/account' },
        { name: 'Your Cart', path: '/cart' },
        { name: 'Wishlist', path: '/wishlist' },
    ],
    'Help': [
        { name: 'Contact', path: '/contact' },
        { name: 'Faqs', path: '/faqs' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
    ],
    'Company': [
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
    ]
};

export default function Footer() {
    return (
        <>
            <div className="facilitybar">
                <div className="container">
                    <div className="facility-flex">
                        {facilityData.map((item, index) => (
                            <div className="f-items" key={index}>
                                <div className={`feature-icon feature-icon--${item.className}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p>{item.title}</p>
                                    <span>{item.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="footer-flex">
                        <div className="footer-item1">
                            <img src="/assets/logo/Greeny.png" alt="Greeny Logo" />
                            <p>Do you have a question?</p>
                            <a href="tel:846-006-6940">846-006-6940</a>
                            <span>7:00 AM - 9:00 PM</span>
                            <p className="g">Offers and support Questions</p>
                            <a className="email" href="mailto:greeny@gmail.com">greeny@gmail.com</a>
                        </div>

                        <div className="footer-item2">
                            {Object.entries(footerLinks).map(([title, links]) => (
                                <div key={title}>
                                    <h3>{title}</h3>
                                    {links.map(link => (
                                        <Link key={link.name} to={link.path}>{link.name}</Link>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="footer-item3">
                            <h3>Download App</h3>
                            <div className="item3-flex">
                                <a href="#"><img src="/assets/images/app.svg" alt="App Store" /></a>
                                <a href="#"><img src="/assets/images/play.svg" alt="Google Play" /></a>
                            </div>
                            <h4>Payment Method</h4>
                            <div className="method-flex">
                                <img src="/assets/images/m1.svg" alt="Payment Methods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

