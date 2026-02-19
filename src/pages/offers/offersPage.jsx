import React from 'react';
import { Link } from 'react-router-dom';
import '../css/offers/offersPage.css';

const offersData = [
    {
        className: 'card-bogo',
        title: 'Buy 1 Get 1 FREE',
        description: 'Double the goodness on select items. Add one to your cart, get another one free!',
        buttonText: 'View BOGO Deals',
        link: '/shop?offer_tag=BUY 1 GET 1'
    },
    {
        className: 'card-10-off',
        title: 'Up to 50% OFF',
        description: 'Enjoy a sweet discount on a wide range of popular groceries and essentials.',
        buttonText: 'Shop Discounted Items',
        link: '/shop?collection=on_sale' 
    },
    {
        className: 'card-festive-off',
        title: 'Festive Season Sale',
        description: 'Huge savings! Get half price on clearance products while stocks last.',
        buttonText: 'Find Bargains',
        link: '/shop?offer_tag=festive season sale'
    },
    {
        className: 'card-deal-day',
        title: 'Deal of the Day',
        description: 'A special, limited-time offer on a featured product. Check back daily!',
        buttonText: "Grab Today's Deal",
        link: '/shop?offer_tag=Deal of the Day'
    }
];

function OffersPage() {
    return (
        <main className="container-offer">
            <div className="page-header">
                <h1 className="page-title">Today's Hottest Offers</h1>
                <p className="page-subtitle">Don't miss out on our exclusive deals! Fresh groceries at prices you'll love.</p>
            </div>

            <div className="offer-cards-grid">
                {offersData.map((offer, index) => (
                    <div key={index} className={`offer-card ${offer.className}`}>
                        <div>
                            <h2 className="offer-title">{offer.title}</h2>
                            <p className="offer-description">{offer.description}</p>
                        </div>
                        <Link to={offer.link} className="offer-button">
                            {offer.buttonText} <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default OffersPage;