// src/utils/mainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer';

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                {/* The <Outlet/> renders the actual page component */}
                <Outlet />
            </main>
            <Footer/>
            {/* You can add a <Footer /> component here later */}
        </>
    );
}

export default MainLayout;