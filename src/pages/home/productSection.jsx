import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../../components/productCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/home/productSection.css';

function ProductSection({ title, subtitle, type }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/collection?type=${type}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(`Failed to fetch ${type} products:`, error);
            }
        };
        if (type) {
            fetchProducts();
        }
    }, [type]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    const cardType = type === 'featured' ? 'featured' : 'detailed';

    return (
        <div className="products-bg">
            <div className="featured-products-container ">
                {subtitle && <p className="subtitle">{subtitle}</p>}
                <div className="section-header">
                    <h2 className="title">{title}</h2>
                </div>


                {products.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {products.map(product => (
                            <div key={product._id} style={{ padding: '0 10px' }}>
                                <ProductCard product={product} type={cardType} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>No products to display.</p>
                )}
            </div>
        </div>
    );
}

export default ProductSection;