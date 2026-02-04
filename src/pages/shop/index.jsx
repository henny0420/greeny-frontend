import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';

import ProductCard from '../../components/productCard';
import ShopBanner from './shopBanner';
import '../css/shop/shopPage.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ShopPage() {
    // FIX #2: Simplified to one state variable for the data
    const [pageContent, setPageContent] = useState([]);
    const [view, setView] = useState('default');
    const [title, setTitle] = useState("Shop");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const location = useLocation();
    const params = useParams();

    // Effect to fetch all categories (used for getting titles)
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchAllCategories();
    }, []);

    // Main effect to fetch page content based on the URL
    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            const categoryId = params.categoryId;
            const searchQuery = location.search;
            let apiUrl = '';

            if (categoryId) {
                setView('filtered');
                const category = categories.find(c => c._id === categoryId);
                setTitle(category ? category.name : "Category");
                apiUrl = `${import.meta.env.VITE_API_URL}/api/products?category=${categoryId}`;
            }
          
            else if (searchQuery) {
                setView('filtered');
                const query = new URLSearchParams(searchQuery);

                const collection = query.get('collection');
                const offerTag = query.get('offer_tag');
                const deal = query.get('deal'); 
                const search = query.get('search');

                if (offerTag) {
                    setTitle(offerTag);
                } else if (deal) {
                    setTitle(deal);
                } else if (collection) {
                    setTitle(`"${collection.replace('is_', '')}" Products`);
                } else if (search) {
                    setTitle(`Search Results for "${search}"`);
                } else {
                    setTitle("Shop");
                }

                apiUrl = `${import.meta.env.VITE_API_URL}/api/products${searchQuery}`;
            }
            else {
                setView('default');
                setTitle("Shop By Department");
                apiUrl = `${import.meta.env.VITE_API_URL}/api/products/by-category`;
            }

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setPageContent(data);
            } catch (error) {
                console.error("Failed to fetch shop data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (categories.length > 0 || !params.categoryId) {
            fetchPageData();
        }
    }, [location.search, params.categoryId, categories]);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    if (loading) return <div className="container"><h2>Loading...</h2></div>;

    return (
        <div className="shop-page">
            <ShopBanner />
            <div className="shop-page-container container">
                {view === 'default' ? (
                    pageContent.map(group => (
                        <div key={group._id} className="department-section">
                            <div className="section-header">
                                <h2>{group.category}</h2>
                                <Link to={`/shop/category/${group._id}`} className="view-all-link">View All &rarr;</Link>
                            </div>
                            <Slider {...sliderSettings} infinite={group.products.length > 4}>
                                {group.products.map(product => (
                                    <div key={product._id} className="product-slide-padding">
                                        <ProductCard product={product} type="detailed" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ))
                ) : (
                    <div className="department-section">
                        <div className="section-header"><h2>{title}</h2></div>
                        <div className="product-grid-container">
                            {pageContent.map(product => (
                                <ProductCard key={product._id} product={product} type="detailed" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopPage;