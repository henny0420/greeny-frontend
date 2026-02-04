
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../../components/productCard'; // We will use our reusable card

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/home/dealOfTheDay.css'; // This will use the new CSS below

function DealOfTheDay() {
    const [dealProducts, setDealProducts] = useState([]);

    useEffect(() => {
        const fetchDealProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/offer/Deal of the Day`);
                const data = await response.json();
                setDealProducts(data);
            } catch (error) {
                console.error("Failed to fetch deal products:", error);
            }
        };
        fetchDealProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: dealProducts.length > 2,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="deal-of-the-day">
            <div className="container">
                <h2>Deal of the day</h2>
                <div className="main-flex">
                    {/* Left Column: Text Content */}
                    <div className="text-section">
                        <h4>Up To 30% OFF</h4>
                        <span>On the selected products</span>
                        <div className="offer">
                            <p>So what are you waiting for,</p>
                            <p className="color-green">Grab the product NOW !!</p>
                        </div>
                        <a href="/products" className="order-btn">
                            <button>ORDER NOW</button>
                        </a>
                    </div>

                    {/* Right Column: The Product Slider */}
                    <div className="product-slider-wrapper">
                        {dealProducts.length > 0 ? (
                            <Slider {...settings} className="simple-slider">
                                {dealProducts.map(product => (
                                    <div key={product._id} className="slide-padding">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No deals available at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DealOfTheDay;