import React from 'react';
import { Link } from 'react-router-dom';

// Import your custom CSS which we will create next
import '../css/home/PromoBanners.css';

// We define the static content for the top two cards in an array
const promoCardsData = [
    {
        className: 'card-premium',
        subtitle: 'Exclusive Purchase',
        title: <>Premium & <br />Organic Products</>, // Using a fragment for the <br>
        link: '/products?collection=is_premium'
    },
    {
        className: 'card-popular',
        subtitle: 'Customer Favorites',
        title: <>Popular Daily <br />Essential Products</>,
        link: '/products?collection=is_popular'
    }
];

function PromoBanners() {
    return (
        <section className="promo-section">
            {/* Top section with two cards */}
            <div className="product-section-container">
                {promoCardsData.map((card, index) => (
                    <div key={index} className={`product-card ${card.className}`}>
                        <p className="card-subtitle">{card.subtitle}</p>
                        <h2 className="card-title">{card.title}</h2>
                        <Link to={card.link} className="shop-now-btn">
                            Shop Now <span>&rarr;</span>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Bottom section with the single delivery banner */}
            <div className="container">
                <div className="banner-container">
                    <div className="banner-delivery">
                        {/* Make sure this image is in your public/assets/banners/ folder */}
                        <img src="https://demo2.wpopal.com/ecolive/wp-content/uploads/2021/10/h1_img6.jpg" alt="banner-image" />
                        <div className="banner-text">
                            <h2>100% Secure delivery without contacting the courier</h2>
                            <Link to="/products" className="shop-now-btn">
                                Shop Now <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PromoBanners;