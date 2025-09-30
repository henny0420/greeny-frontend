import React from "react";
import HeroBanner from "./heroBanner";
import ShopByDepartment from "./shopByDepartment";
import DealOfTheDay from "./dealOfTheDay";
import HotOffers from "./hotOffers";
import ProductSection from "./productSection";
import PromoBanners from "./PromoBanners";

export default function HomePage() {
    return (
        <div>
            <HeroBanner />
            <ShopByDepartment />
            <DealOfTheDay/>
            <HotOffers/>
            <ProductSection
            title="Featured Products" 
            subtitle="Fresh Food"
            type="featured" 
            />
            <PromoBanners/>
        </div>
    );
}

