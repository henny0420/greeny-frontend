import React from 'react';
import { Link } from 'react-router-dom';

import '../css/home/PromoBanners.css';

const promoCardsData = [
    {
        className: 'card-premium',
        subtitle: 'Exclusive Purchase',
        title: <>Premium & <br />Organic Products</>,
        link: '/shop?collection=is_premium'
    },
    {
        className: 'card-popular',
        subtitle: 'Customer Favorites',
        title: <>Popular Daily <br />Essential Products</>,
        link: '/shop?collection=is_popular'
    }
];

function PromoBanners() {
    return (
        <section className="promo-section">
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

            <div className="container">
                <div className="banner-container">
                    <div className="banner-delivery">
                        <img src="https://demo2.wpopal.com/ecolive/wp-content/uploads/2021/10/h1_img6.jpg" alt="banner-image" />
                        <div className="banner-text">
                            <h2>100% Secure delivery without contacting the courier</h2>
                            <Link to="/shop" className="shop-now-btn">
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