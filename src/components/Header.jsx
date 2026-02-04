import React, { useState, useEffect } from 'react';
const instagram = '/assets/logo/instagram.png';
const facebook = '/assets/logo/facebook.png';
const logo = '/assets/logo/Greeny.png';
const profile = '/assets/logo/profile.svg';
import { Link, useNavigate } from 'react-router-dom';
// FIX #1: Added useNavigate to the import
import './Header.css';

import { useAuth } from '../context/authContext';

function Header() {
  const [categories, setCategories] = useState([]);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate(); // FIX #1 (continued): Call the hook here

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // This creates the correct URL, e.g., /shop?search=tomato
      navigate(`/shop?search=${searchTerm}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* SECTION 1 */}
      <div className="section1">
        <div className="container">
          <div className="info-section">
            <div>
              <span>Need help? Call Us: </span>
              <span className="yellow">+90 93169 29055</span>
            </div>
            <span>order now and get it within <span className="yellow">30 minutes</span></span>
            <div className="flex-end">
              <h6>Follow us</h6>
              {/* FIX #2 (continued): Use image paths as simple strings */}
              <div className="round"><img src={instagram} alt="Instagram" /></div>
              <div className="round"><img src={facebook} alt="Facebook" /></div>
              {isLoggedIn ? (
                <>
                  <Link to="/account" style={{ color: 'inherit', textDecoration: 'none' }}><h6>Hello, {user?.name}</h6></Link>
                  <div className="verticle-line"></div>
                  <a onClick={handleLogout} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}><h6>SIGN OUT</h6></a>
                </>
              ) : (
                <>
                  <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}><h6>Register Now</h6></Link>
                  <div className="verticle-line"></div>
                  <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}><h6>SIGN IN</h6></Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="header2">
        <div className="container">
          <div className="search-section">
            <div className="logo-section">
              <Link to="/"><img src={logo} alt="Greeny Logo" /></Link>
            </div>
            <form action="/search" method="GET" className="search-location" onSubmit={handleSearchSubmit} >
              <div className="search-section-in">
                <select name="category">
                  <option value="all">All Products</option>
                  {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                </select>
                <div className="verticle-line"></div>
                <div className="search">
                  <input
                    type="text"
                    name="query"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required />
                  <button type="submit" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
                  </button>
                </div>
              </div>
              <div className="location">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span><input placeholder="Your location" /></span>
              </div>
            </form>
            <div className="wishlist-flex">
              <Link to="/cart" className="cart-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="cart">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{ width: '32px', height: '32px' }}><path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" /></svg>
                  <div className="cart2"><h5>Shopping cart</h5></div>
                </div>
              </Link>
              <div className="account">

                <img src={profile} alt="Profile" />

                <div className="account-dropdown">

                  <Link to="/account"><h6>My Account</h6></Link>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="header-elements">
        <div className="container">
          <div className="elements">
            <div className="element1">
              <Link to="/shop" className="department-link" style={{ textDecoration: 'none' }}>
                <div className="department">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                  <span>Shop By Catagory</span>
                </div>
              </Link>
              <div className="elements-a">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/offers">Offers</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="element2">
              <Link to="/shop?offer_tag=Deal of the Day"><button>Deal of the day</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;