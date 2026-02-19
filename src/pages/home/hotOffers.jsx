import React from 'react';
import { Link } from 'react-router-dom';

import '../css/home/hotOffers.css';

const offersData = [
    {
        className: 'one',
        line1: 'Offer',
        line2: 'BUY 1 GET 1',
        link: '/shop?offer_tag=BUY 1 GET 1'
    },
    {
        className: 'two',
        line1: 'Get up to 10% off',
        line2: 'on oil & fats',
        link: '/shop/category/68c6dedd9f4ef46c67b64cd7'
    },
    {
        className: 'three',
        line1: 'Get fresh Breads &',
        line2: 'Bakery items',
        link: '/shop/category/68c6df109f4ef46c67b64ce6'
    }
];

function HotOffers() {
    return (
        <div className="hot-offers">
            <div className="container">
                <h2>Hot offers</h2>

                <div className="offer-grid">
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