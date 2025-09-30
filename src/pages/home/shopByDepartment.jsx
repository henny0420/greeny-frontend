import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '../css/home/shopByDepartment.css';

// Import Slick's CSS (if you haven't already in a main file)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import your custom CSS file
import '../css/home/shopByDepartment.css';

function ShopByDepartment() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Settings for the Slick Slider
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 5, slidesToScroll: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 4, slidesToScroll: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            }
        ]
    };

    return (
        <div className="shopby-department">
            <div className="container">
                <h2>Shop By Department</h2>
                
                <Slider {...settings} className="department-slider">
                    {categories.map(category => (
                        // Each item in the map is a direct child of the slider
                        <div key={category._id}>
                            <Link to={`/products/category/${category.name}`} className="department-link">
                                <div className="image-box">
                                    <img src={`/assets/categories/${category.image_url}`} alt={category.name} />
                                    <span>{category.name}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ShopByDepartment;