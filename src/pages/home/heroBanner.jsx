import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

// Import images
import heroImage1 from '/assets/images/herob.png';
import heroImage2 from '/assets/images/basket.png';
import heroImage3 from '/assets/images/bascket3.png';

// Import the required CSS files for react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import your custom CSS file which we will create next
import '../css/home/heroBanner.css';

function HeroBanner() {
    // Settings for the slider component
    const settings = {
        dots: true,       // Show navigation dots
        infinite: true,   // Loop the slider
        speed: 500,       // Transition speed in ms
        slidesToShow: 1,    // Show one slide at a time
        slidesToScroll: 1,  // Scroll one slide at a time
        autoplay: true,     // Enable auto-play
        autoplaySpeed: 1000 // Auto-play interval
    };

    return (
        // The main container for the slider. react-slick will add its classes here.
        <div className="herobanner-section">
            <Slider {...settings}>
                {/* Slide 1 */}
                <div className="slide">
                    <div className="herobanner container">
                        <div className="hero-text">
                            <h4>Stay at home &</h4>
                            <h4>We bring the store</h4>
                            <h5> to your door</h5>
                            <p>Free shipping on all your order. we deliver, you enjoy</p>
                            <Link to="/shop">
                                <button>ORDER NOW</button>
                            </Link>
                        </div>
                        <div>
                            <img src={heroImage1} alt="Fresh Vegetables" style={{ width: '700px', height: '650px' }} />
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="slide">
                    <div className="herobanner container">
                        <div className="hero-text">
                            <h4>Fresh & healthy</h4>
                            <h5>organic food</h5>
                            <span>Save up to 20% off</span>
                            <Link to="/shop">
                                <button>ORDER NOW</button>
                            </Link>
                        </div>
                        <div>
                            <img src={heroImage2} alt="Fresh Grocery" style={{ marginTop: '30px', width: '700px' }} />
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="slide">
                    <div className="herobanner container">
                        <div className="hero-text">
                            <h4>Fresh Fruits &</h4>
                            <h5>Big Discount</h5>
                            <span>Save up to 50% on your first order</span>
                            <Link to="/shop">
                                <button>ORDER NOW</button>
                            </Link>
                        </div>
                        <div>
                            <img src={heroImage3} alt="Fresh Fruits" style={{ marginTop: '90px', objectFit: 'cover', width: '800px' }} />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default HeroBanner;