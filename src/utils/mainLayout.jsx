// src/utils/mainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../components/Footer';
import Header from '../components/Header';
import Footer from '../components/footer';

function MainLayout() {
    return (
        <>
        
            {/* <Header/> */}
            <Header/>
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