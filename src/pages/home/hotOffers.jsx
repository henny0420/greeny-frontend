import React from 'react';
import { Link } from 'react-router-dom';

// Import your custom CSS which we will create next
import '../css/home/hotOffers.css';

// We define the static content for the cards in an array
const offersData = [
    {
        className: 'one',
        line1: 'Offer',
        line2: 'BUY 1 GET 1',
        link: '/products?offer_tag=BUY 1 GET 1'
    },
    {
        className: 'two',
        line1: 'Get up to 10% off',
        line2: 'on oil & fats',
        link: '/products/category/Fats and Oils' // Example link to a category page
    },
    {
        className: 'three',
        line1: 'Get fresh Breads &',
        line2: 'Bakery items',
        link: '/products/category/Bakery' // Example link to a category page
    }
];

function HotOffers() {
    return (
        <div className="hot-offers">
            <div className="container">
                <h2>Hot offers</h2>

                <div className="offer-grid">
                    {/* We map over the data array to create the three cards */}
                    {offersData.map((offer, index) => (
                        <div key={index} className={`offer-grid-items ${offer.className}`}>
                            <h4>{offer.line1}</h4>
                            <h4>{offer.line2}</h4>
                            <Link to={offer.link} className="order-btn">
                                <button>Shop Now <span>&rarr;</span></button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HotOffers;